# RP Hunt Design

Independent website design portfolio for Ryan Hunt.

- Live website: https://rphdesign.com/
- Hosting: GitHub Pages, deployed from the repository root.
- Root site files and the `dist/` copies are kept identical. Update both when editing.

## Pages
Home, Projects, Pricing, Approach, Privacy, and four project stories:
- /projects/carli-special/
- /projects/rebel-hair-goddess/
- /projects/old-school-cities/
- /projects/cabrera-auto-services/

The gallery links to project stories; each story retains a link to the live client website or independent project repository.

## Local preview
```sh
python3 -m http.server 8000
```
Open http://localhost:8000. Assets use root-relative paths.

## Contact form
The form submits via FormSubmit to huntry1127@gmail.com without opening an email app.
The recipient must activate FormSubmit through its confirmation email before delivery is enabled.
The interface checks both HTTP status and the provider's success response; errors retain the visitor's entries.
No email-delivery credentials are stored in the repository.

## Search setup
Canonical links, social URLs, sitemap.xml, and robots.txt use https://rphdesign.com/.
See docs/SEO-SETUP.md for the remaining account and promotion steps.
