<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/howardt12345/website-v2/master/src/images/logo.png" width="100" />
</div>
<h1 align="center">
  howardt12345.com - v2
</h1>
</h1>
<p align="center">
  The second iteration of <a href="https://howardt12345.com" target="_blank">howardt12345.com</a>, designed in <a href="https://www.figma.com/design/" target="_blank">Figma</a>, built with <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a>, and hosted with <a href="https://www.netlify.com/" target="_blank">Netlify</a>
</p>
<p align="center">
  Previous iterations:
  <a href="https://github.com/howardt12345/website-v1" target="_blank">v1</a>,
</p>
<p align="center">
  <a href="https://app.netlify.com/sites/v2-howardt12345/deploys" target="_blank">
    <img src="https://api.netlify.com/api/v1/badges/cbfaf310-3712-4951-9795-1bfc5c4e4281/deploy-status" alt="Netlify Status" />
  </a>
</p>

![demo](https://raw.githubusercontent.com/howardt12345/website-v2/master/src/images/og.png)

## About the website

This website was made as my first project working with web technologies. The foundation of this website was built by analysing and modifying <a href="https://github.com/bchiang7/v4" target="_blank" rel="nofollow noopener noreferrer">Brittiany Chiang's website v4</a> to fit my needs for this website. The Portfolio page uses Cloud Firestore as its database, and the Portfolio Manager was ported from Dart and adapted from <a href="https://github.com/howardt12345/website-v1" target="_blank" rel="nofollow noopener noreferrer">website v1</a> to ensure backwards compatibility, with future plans to support multimedia components. It should be enough for a small amount of traffic, however I may end up using a JSON based system in the future if need be. The Contact page form writes to Cloud Firestore, where I'm able to reply using the website manager. 

## Installation & Setup

1. Installing the Gatsby CLI:

   ```sh
   npm install -g gatsby-cli
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   gatsby develop
   ```
   The site is now running at `http://localhost:8000`!
  
## Building and Running for Production:   

1. Generate a full static production build

   ```sh
   gatsby build
   ```

2. Preview the site as it will appear once deployed

   ```sh
   gatsby serve
   ```
   The preview site should now be running at `http://localhost:9000`.

## Color Reference:

| Color                | Hex                                                                |
| -------------------- | ------------------------------------------------------------------ |
| background           | ![#FFFFFF](https://via.placeholder.com/10/FFFFFF?text=+) `#FFFFFF` |
| background_secondary | ![#EAEAEA](https://via.placeholder.com/10/EAEAEA?text=+) `#EAEAEA` |
| accent               | ![#2196F3](https://via.placeholder.com/10/2196F3?text=+) `#2196F3` |
| textPrimary          | ![#000000](https://via.placeholder.com/10/000000?text=+) `#000000` |
| textSecondary        | ![#7A7A7A](https://via.placeholder.com/10/7A7A7A?text=+) `#7A7A7A` |
| textBody             | ![#0C0C0C](https://via.placeholder.com/10/0C0C0C?text=+) `#0C0C0C` |
