# Publishing the Azure Data Mapper Explorer

This deliverable is static HTML, CSS, JavaScript, Markdown, and a downloadable `.pptx`, so it can be hosted publicly without a server.

## Best current options

### 1. GitHub Pages

Best when you want the simplest public URL with minimal setup.

Why this is a good fit:

- GitHub says Pages can publish from a branch or a custom GitHub Actions workflow.
- GitHub recommends a custom workflow when you want more control over the publish process.
- This repo now includes a GitHub Pages workflow that publishes the entire `deliverables/azure-data-mapper-presentation` folder.

What to do:

1. Push this repo to GitHub.
2. In the repository, go to `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main` or run the workflow manually from the `Actions` tab.
5. Share the published Pages URL.

How this deliverable is prepared:

- `deliverables/azure-data-mapper-presentation/index.html` is the public root entry page.
- It redirects to `frontend/index.html`, so the site works cleanly when the whole folder is published.
- The workflow artifact includes the downloadable PowerPoint and Markdown companion files.

## 2. Azure Static Web Apps

Best when you want an Azure-native hosting model.

Why it is a strong option:

- Microsoft says Azure Static Web Apps automatically deploys from a code repository.
- Microsoft says it integrates directly with GitHub or Azure DevOps.
- Microsoft documents globally distributed static content and free automatically renewing SSL certificates.
- Microsoft documents a Free plan for personal projects and a Standard plan for production apps.

If you want this route, I can set it up next. I did not add Azure Static Web Apps files yet because that is a separate deployment choice.

## Public sharing notes

- Anything published with GitHub Pages or Azure Static Web Apps is publicly reachable.
- GitHub warns that Pages sites are publicly available on the internet, even in cases where repository visibility and plan settings differ, so remove anything sensitive before publishing.
- Do not publish secrets, connection strings, or internal-only sample payloads.

## Official references

- GitHub Pages publishing sources:
  - https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Pages custom workflows:
  - https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- Azure Static Web Apps overview:
  - https://learn.microsoft.com/en-us/azure/static-web-apps/overview
- Azure Static Web Apps plans:
  - https://learn.microsoft.com/en-us/azure/static-web-apps/plans
