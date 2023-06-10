# How to navigate and update the new DSG website

If you have any questions, contact Peter!

The new website is meant to be EASY to update without directly modifying any of the source code. The only files you need to interact with should be the JSON and markdowns files.

### JSON
```
src/json
  carousel.json
  news.json
  people.json
  pubs.json
```

### Markdowns
```
src/markdowns
  projects/
    treeline.mdx
    ...
```

To add projects, please add a new `.mdx` file/ update your existing `.mdx` files. Each markdown file must have both the frontmatter (stuff within the dashes) and the content (stuff after the dashes). Please make sure to wrap title and summary in double quotation marks. If you need to escape quotes, do something like `\"escape\"`.

```mdx
---
title: ""
link: /xxx
summary: ""
status: current or past
image: ../../images/projects/xxx
---

CONTENT GOES HERE

# if you want to add an image
![An image](../../images/projects/xxx.png)

```


### Images
Images are in two locations, either `src/images` or `static/`. Only the carousel images on the home page should be added to `static/carousel`, all other images should be added to their respective folders in `src/images`.

### Clone and Deploy

To use this repository, make sure you have installed [NodeJS](https://nodejs.org/en) (the latest LTS version (>= v18)). Then, after cloning the respository, open a terminal and run

```
npm install --force # this only need to be done the first time
npm run develop
```

You should see the website at `localhost:8000/`.

To deploy the website, run `npm run deploy`. Commit your updates!

### Work-in-progress

- mobile responsiveness
- SEO optimizations

If you have any feature requests, please let Peter know :)




