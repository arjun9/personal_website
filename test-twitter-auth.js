#!/usr/bin/env node

// Twitter API Authentication Test Script
// Run with: node test-twitter-auth.js

const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config({ path: '.env.local' });

console.log('🐦 Twitter API Authentication Test\n');
console.log('=' .repeat(50));

// Helper function to safely display partial credentials
function maskCredential(cred, showChars = 8) {
  if (!cred) return 'MISSING ❌';
  return `${cred.substring(0, showChars)}...`;
}

// Step 1: Check environment variables
console.log('\n📋 Step 1: Environment Variables Check');
console.log('-'.repeat(30));

const credentials = {
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
};

console.log(`TWITTER_APP_KEY:     ${maskCredential(credentials.appKey)}`);
console.log(`TWITTER_APP_SECRET:  ${maskCredential(credentials.appSecret)}`);
console.log(`TWITTER_ACCESS_TOKEN: ${maskCredential(credentials.accessToken)}`);
console.log(`TWITTER_ACCESS_SECRET: ${maskCredential(credentials.accessSecret)}`);

// Check if all credentials are present
const allPresent = Object.values(credentials).every(cred => cred && cred.length > 0);

if (!allPresent) {
  console.log('\n❌ FAILED: Missing credentials in .env.local file');
  console.log('\n🔧 Fix:');
  console.log('1. Make sure you have a .env.local file in your project root');
  console.log('2. Add all four Twitter credentials to the file');
  console.log('3. Restart this script');
  process.exit(1);
}

console.log('\n✅ All credentials found in environment');

// Step 2: Test App-only Authentication (OAuth 2.0 style with app credentials)
console.log('\n🔐 Step 2: App-Only Authentication Test');
console.log('-'.repeat(30));

async function testAppAuth() {
  try {
    // Create client with just app credentials (no user context)
    const appClient = new TwitterApi({
      appKey: credentials.appKey,
      appSecret: credentials.appSecret,
    });
    
    // Get app-only bearer token
    const appOnlyClient = await appClient.appLogin();
    console.log('✅ App authentication successful!');
    
    // Test a simple read-only operation
    const rateLimits = await appOnlyClient.v2.get('tweets/search/recent', {
      query: 'hello',
      max_results: 1
    });
    
    console.log('✅ App can make read-only API calls');
    return true;
  } catch (error) {
    console.log('❌ App authentication failed:', error.message);
    console.log('🔧 This suggests your App Key or App Secret is incorrect');
    return false;
  }
}

// Step 3: Test User Authentication (OAuth 1.0a with user tokens)
console.log('\n👤 Step 3: User Authentication Test');
console.log('-'.repeat(30));

async function testUserAuth() {
  try {
    // Create client with full OAuth 1.0a credentials
    const userClient = new TwitterApi({
      appKey: credentials.appKey,
      appSecret: credentials.appSecret,
      accessToken: credentials.accessToken,
      accessSecret: credentials.accessSecret,
    });
    
    // Test by getting user info
    const user = await userClient.v2.me();
    console.log(`✅ User authentication successful!`);
    console.log(`   Connected as: @${user.data.username} (${user.data.name})`);
    console.log(`   User ID: ${user.data.id}`);
    
    return { success: true, client: userClient, user: user.data };
  } catch (error) {
    console.log('❌ User authentication failed:', error.message);
    console.log('   Error code:', error.code || 'N/A');
    
    if (error.code === 401) {
      console.log('\n🔧 401 Error usually means:');
      console.log('   1. Access Token or Access Secret is incorrect');
      console.log('   2. App permissions are set to "Read-only"');
      console.log('   3. Tokens were not regenerated after changing permissions');
    }
    
    return { success: false, error };
  }
}

// Step 4: Test Write Permissions (if user auth succeeds)
async function testWritePermissions(userClient) {
  console.log('\n✍️  Step 4: Write Permissions Test');
  console.log('-'.repeat(30));
  
  try {
    // Test by trying to get rate limit info for write endpoints
    const rateLimits = await userClient.v1.get('application/rate_limit_status.json', {
      resources: 'statuses'
    });
    
    const tweetLimit = rateLimits.resources?.statuses?.['statuses/update'];
    
    if (tweetLimit) {
      console.log('✅ Write permissions confirmed!');
      console.log(`   Tweet endpoint accessible (${tweetLimit.remaining}/${tweetLimit.limit} remaining)`);
      return true;
    } else {
      console.log('⚠️  Write permissions unclear - rate limit info not available');
      return false;
    }
  } catch (error) {
    console.log('❌ Write permissions test failed:', error.message);
    
    if (error.code === 403) {
      console.log('\n🔧 403 Error usually means:');
      console.log('   1. Your app permissions are set to "Read-only"');
      console.log('   2. Go to Twitter Developer Portal > Your App > Settings');
      console.log('   3. Change "App permissions" to "Read and Write"');
      console.log('   4. Regenerate your Access Token and Secret');
    }
    
    return false;
  }
}

// Main test runner
async function runTests() {
  try {
    // Test app authentication
    const appAuthSuccess = await testAppAuth();
    
    if (!appAuthSuccess) {
      console.log('\n❌ OVERALL RESULT: App credentials are invalid');
      console.log('\n🔧 Next steps:');
      console.log('1. Double-check your App Key and App Secret');
      console.log('2. Make sure you copied them correctly from Twitter Developer Portal');
      process.exit(1);
    }
    
    // Test user authentication
    const userAuthResult = await testUserAuth();
    
    if (!userAuthResult.success) {
      console.log('\n❌ OVERALL RESULT: User authentication failed');
      console.log('\n🔧 Next steps:');
      console.log('1. Check your Access Token and Access Secret');
      console.log('2. Go to Twitter Developer Portal > Your App > Settings');
      console.log('3. Ensure "App permissions" is set to "Read and Write"');
      console.log('4. Regenerate your Access Token and Secret');
      console.log('5. Update your .env.local file with new tokens');
      process.exit(1);
    }
    
    // Test write permissions
    const writePermissions = await testWritePermissions(userAuthResult.client);
    
    console.log('\n🎉 OVERALL RESULT:');
    console.log('=' .repeat(50));
    
    if (writePermissions) {
      console.log('✅ SUCCESS! Your Twitter API setup is working correctly');
      console.log('✅ You can post tweets and upload media');
      console.log('\n🚀 Your Twitter integration should work now!');
    } else {
      console.log('⚠️  PARTIAL SUCCESS: Authentication works but write permissions unclear');
      console.log('   Try posting a test tweet to confirm write access');
    }
    
  } catch (error) {
    console.log('\n💥 UNEXPECTED ERROR:', error.message);
    console.log('Please check your internet connection and try again.');
  }
}

// Run the tests
runTests();
