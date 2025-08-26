// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ 
          label: 'Description', 
          multiline: true 
        }),
        author: fields.text({ 
          label: 'Author', 
          defaultValue: 'Arjun Verma' 
        }),
        date: fields.date({ 
          label: 'Date', 
          defaultValue: { kind: 'today' },
          validation: { isRequired: true }
        }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        content: fields.markdoc({ 
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/articles',
              publicPath: '/images/articles/',
            },
          },
        }),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: 'About Page',
      path: 'src/content/about',
      format: { data: 'json' },
      schema: {
        title: fields.text({ 
          label: 'Page Title', 
          defaultValue: 'About' 
        }),
        subtitle: fields.text({ 
          label: 'Subtitle',
          defaultValue: "I'm Arjun Verma. I live in India, where I build for the future."
        }),
        description: fields.text({ 
          label: 'Meta Description',
          multiline: true,
          defaultValue: "I'm Arjun Verma. I live in India, where I build for the future."
        }),
        image: fields.image({
          label: 'Portrait Image',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        content: fields.markdoc({ 
          label: 'About Content',
          options: {
            image: {
              directory: 'public/images',
              publicPath: '/images/',
            },
          },
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.select({
              label: 'Platform',
              options: [
                { label: 'Twitter', value: 'twitter' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'GitHub', value: 'github' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Email', value: 'email' },
              ],
              defaultValue: 'twitter',
            }),
            url: fields.url({ 
              label: 'URL',
              validation: { isRequired: true }
            }),
            label: fields.text({ label: 'Display Label' }),
          }),
          {
            label: 'Social Links',
            itemLabel: props => props.fields.platform.value || 'Social Link',
          }
        ),
      },
    }),
    articlesPage: singleton({
      label: 'Articles Page',
      path: 'src/content/articles-page',
      format: { data: 'json' },
      schema: {
        title: fields.text({ 
          label: 'Page Title', 
          defaultValue: 'Articles' 
        }),
        subtitle: fields.text({ 
          label: 'Subtitle',
          defaultValue: 'Writing on software engineering, company building & philosophy'
        }),
        description: fields.text({ 
          label: 'Meta Description',
          multiline: true,
          defaultValue: 'All of my long-form thoughts on programming, leadership, product design and more, collected in chronological order.'
        }),
        intro: fields.text({ 
          label: 'Introduction Text',
          multiline: true,
          defaultValue: 'All of my long-form thoughts on programming, leadership, product design and more, collected in chronological order.'
        }),
      },
    }),
    productsPage: singleton({
      label: 'Products Page',
      path: 'src/content/products-page',
      format: { data: 'json' },
      schema: {
        title: fields.text({ 
          label: 'Page Title', 
          defaultValue: 'Products' 
        }),
        subtitle: fields.text({ 
          label: 'Subtitle',
          defaultValue: "Things I've made trying to put my dent in the universe."
        }),
        description: fields.text({ 
          label: 'Meta Description',
          multiline: true,
          defaultValue: "Things I've made trying to put my dent in the universe."
        }),
        intro: fields.text({ 
          label: 'Introduction Text',
          multiline: true,
          defaultValue: "I've loved making things for as long as I can remember, and I've been lucky enough to be able to make a living doing it. Here are some of the companies/products I've created over the years"
        }),
        products: fields.array(
          fields.object({
            name: fields.text({ label: 'Product Name' }),
            description: fields.text({ 
              label: 'Description', 
              multiline: true 
            }),
            url: fields.url({ 
              label: 'Product URL',
              validation: { isRequired: true }
            }),
            linkLabel: fields.text({ 
              label: 'Link Label',
              defaultValue: 'Visit Site'
            }),
            logo: fields.image({
              label: 'Logo',
              directory: 'public/images/logos',
              publicPath: '/images/logos/',
            }),
          }),
          {
            label: 'Products',
            itemLabel: props => props.fields.name.value || 'Product',
          }
        ),
      },
    }),
    projectsPage: singleton({
      label: 'Projects Page',
      path: 'src/content/projects-page',
      format: { data: 'json' },
      schema: {
        title: fields.text({ 
          label: 'Page Title', 
          defaultValue: 'Projects' 
        }),
        subtitle: fields.text({ 
          label: 'Subtitle',
          defaultValue: "Things I've made trying to give back to the community."
        }),
        description: fields.text({ 
          label: 'Meta Description',
          multiline: true,
          defaultValue: "Things I've made trying to give back to the community."
        }),
        intro: fields.text({ 
          label: 'Introduction Text',
          multiline: true,
          defaultValue: "I've worked on numerous small projects over the years, but only recently have I made some of them open source. If something piques your interest, feel free to check out the code and contribute your ideas for improvements."
        }),
        projects: fields.array(
          fields.object({
            name: fields.text({ label: 'Project Name' }),
            description: fields.text({ 
              label: 'Description', 
              multiline: true 
            }),
            url: fields.url({ 
              label: 'Project URL',
              validation: { isRequired: true }
            }),
            linkLabel: fields.text({ 
              label: 'Link Label',
              defaultValue: 'github.com'
            }),
            logo: fields.image({
              label: 'Logo',
              directory: 'public/images/logos',
              publicPath: '/images/logos/',
            }),
          }),
          {
            label: 'Projects',
            itemLabel: props => props.fields.name.value || 'Project',
          }
        ),
      },
    }),
    homePage: singleton({
      label: 'Home Page',
      path: 'src/content/home-page',
      format: { data: 'json' },
      schema: {
        title: fields.text({ 
          label: 'Meta Title', 
          defaultValue: 'Arjun Verma - Software engineer, founder, and amateur philosopher' 
        }),
        description: fields.text({ 
          label: 'Meta Description',
          multiline: true,
          defaultValue: "I'm Arjun, a software engineer and entrepreneur based in Gurgaon, India."
        }),
        mainHeading: fields.text({ 
          label: 'Main Heading',
          defaultValue: 'Software engineer, founder, and amateur philosopher.'
        }),
        intro: fields.markdoc({ 
          label: 'Introduction Paragraph',
          options: {
            image: {
              directory: 'public/images',
              publicPath: '/images/',
            },
          }
        }),
        hetuLabsUrl: fields.url({ 
          label: 'Hetu Labs URL',
          defaultValue: 'https://www.hetu-labs.com/'
        }),
        calendlyUrl: fields.url({ 
          label: 'Calendly URL',
          defaultValue: 'https://calendly.com/arjun-verma-in/30min'
        }),
        visionStatement: fields.text({ 
          label: 'Vision Statement',
          multiline: true,
          defaultValue: '🔥 In light of AI\'s advancement, I hope to witness a future where software development is commoditized and democratized for everyone, and I aim to be an integral part of this change.'
        }),
        visionLinkUrl: fields.url({ 
          label: 'Vision Link URL',
          defaultValue: 'https://hbr.org/2005/06/the-coming-commoditization-of-processes'
        }),
        visionLinkText: fields.text({ 
          label: 'Vision Link Text',
          defaultValue: 'software development is commoditized and democratized for everyone'
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.select({
              label: 'Platform',
              options: [
                { label: 'Twitter', value: 'twitter' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'GitHub', value: 'github' },
                { label: 'LinkedIn', value: 'linkedin' },
              ],
              defaultValue: 'twitter',
            }),
            url: fields.url({ 
              label: 'URL',
              validation: { isRequired: true }
            }),
            ariaLabel: fields.text({ 
              label: 'Aria Label',
              defaultValue: 'Follow on Twitter'
            }),
          }),
          {
            label: 'Social Links',
            itemLabel: props => props.fields.platform.value || 'Social Link',
          }
        ),
        workExperience: fields.array(
          fields.object({
            company: fields.text({ label: 'Company Name' }),
            title: fields.text({ label: 'Job Title' }),
            url: fields.url({ label: 'Company URL' }),
            logo: fields.image({
              label: 'Company Logo',
              directory: 'public/images/logos',
              publicPath: '/images/logos/',
            }),
            startDate: fields.text({ 
              label: 'Start Date',
              defaultValue: '2021'
            }),
            endDate: fields.text({ 
              label: 'End Date (or "Present")',
              defaultValue: 'Present'
            }),
          }),
          {
            label: 'Work Experience',
            itemLabel: props => props.fields.company.value || 'Job',
          }
        ),
        resumeUrl: fields.url({ 
          label: 'Resume/CV URL',
          defaultValue: 'https://drive.google.com/file/d/1g6tmDHD2ajPAVMsglITupcWyFAFt5Uw5/view?usp=sharing'
        }),
        newsletterTitle: fields.text({ 
          label: 'Newsletter Title',
          defaultValue: 'Stay up to date'
        }),
        newsletterDescription: fields.text({ 
          label: 'Newsletter Description',
          multiline: true,
          defaultValue: 'Get notified when I publish something new, and unsubscribe at any time.'
        }),
        photos: fields.array(
          fields.image({
            label: 'Photo',
            directory: 'public/images/photos',
            publicPath: '/images/photos/',
          }),
          {
            label: 'Photos',
            itemLabel: (_, index) => `Photo ${index + 1}`,
          }
        ),
      },
    }),
  },
});
