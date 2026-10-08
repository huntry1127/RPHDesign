# RP Hunt Design

Portfolio website for Ryan Hunt's web design services.

## Site contents

- Home with architectural emerald hero and original black-and-white headshot
- Full-screen navigation with hamburger menu
- Projects: Carli Special, Rebel Hair Goddess, Old School Cities, and Cabrera Auto Services
- Pricing: Essentials from $500, Signature from $1,000, and Refresh & Overhaul by custom quote
- Approach and privacy pages

## Run locally

This is a buildless HTML, CSS, and JavaScript site. From the repository root:

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Deploy `dist/` as the website root on a static host. The site uses root-relative paths; hosting under a subdirectory such as GitHub Pages `/RPHDesign/` needs base-path configuration.

The contact form downloads a project brief locally; it does not send an email or submit an inquiry. Configure a real delivery provider before advertising inquiry submission.
