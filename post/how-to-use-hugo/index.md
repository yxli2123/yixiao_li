---
title: How to Make a Webpage by Hugo
subtitle: 

# Summary for listings and search engines
summary: Hogo tutorials

# Link this post with a project
projects: []

# Date published
date: "2022-03-21T00:00:00Z"

# Date updated
lastmod: "2022-03-21T00:00:00Z"

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: 'Hello World'
  focal_point: ""
  placement: 2
  preview_only: false

authors:
- Yixiao

tags:
- Hogo
- Webpage

categories:
- Tutorials
---

Do you like this website?

If yes, let me tell you how to create it on your own site

## Create Local Website

This tutorial is based on [HUGO](https://gohugo.io), a convenient command line tool to create and manage your website in a Markdown way.

### 1 Install HUGO

In Linux or MacOS, run the following command (if you have installed `brew` already)

```bash
brew install hugo
```

### 2 Create a New Site

`cd` to your local directory that you are going to store all your website file. For example, run the following command

```bash
cd /home/[usename]/Documents/mysite
```

Then, use `hugo new site [website_name] `, where you can change `[website_name]` to your favorite. For example

```bash
hugo new site homepage
```

Executing this command, the HUGO will create several directories and files that are necessary for your website. 

If you `cd` into `./homepage/`, the directory structure looks like:

```bash
├── archetypes
│   └── default.md
├── config.toml         # The configure file
├── content             # Where you store Markdown webpages
├── data                
├── layouts             # Layout of your website 
├── static              
└── themes              # Where you store your favorite themes
```

**Bear in mind the differences between website and webpage**

Webpage is what you can directly see in a browser. It is basically a `.html` file.

Website is the union of all your webpages, including some asserts like images, document files, videos, etc.

### 3 Download a Theme

You can find your favorite themes in [Hugo Themes](https://themes.gohugo.io), and download it  by the instructions in the link.

For example, I like `minimo`, where it is on https://github.com/MunifTanjim/minimo. The README.md says, I should run the following command to install this theme

```bash
git clone --depth 1 https://github.com/MunifTanjim/minimo themes/minimo
```

### 4 Configure for Website

There is an example configure file in the theme, `./themes/minimo/config.toml`

You can simply copy it to your own directory and modify it. To do so, run

```bash
cp ./themes/minimo/exampleSite/config.toml ./config.toml
```

Here's an example of my `config.toml` file:

```toml
baseURL = "http://home.ustc.edu.cn/~anyfine2123/"
title = "Yixiao Li"
theme = "minimo"

Paginate = 5
preserveTaxonomyNames = true

enableRobotsTXT = true # generate robots.txt

# Syntax Highlighting ( https://gohugo.io/content-management/syntax-highlighting/ )
pygmentsCodefences = true

enableEmoji = true

# Missing translations will default to this content language
defaultContentLanguage = "en"

[params.info]
description = "A senior student in USTC."
title404 = "Nothing's here!"

[params.assets]
favicon = "favicon.ico"
customCSS = ["css/custom.css"]
customJS = ["js/custom.js"]
gopher = "" # used in 404 template ( Generator: https://gopherize.me )

[params.settings]
# date & time format: https://golang.org/pkg/time/
dateFormat = "2006, Jan 02"
listDateFormat = "2006, Jan 02"
archiveDateFormat = "Jan 02"
#hideEntryNavigation = ["page"] # boolean / array of sections
#hideEntryMeta = ["page"] # boolean / array of sections
showReadingTime = true
showLastmod = true
taxonomyCloudShuffle = true
#accentColor = "#ffcd00"
hideMainMenu = false

[params.sidebar]
enable = true

[params.widgets]
header = ["breadcrumbs"]
sidebar = ["about","sidebar_menu", "social_menu"]
footer = ["social_menu"]

# Title Separator: - – — · • * ⋆ | ~ « » < >
titleSeparator = "•"

[params.social]
email = "yxli2123@gmail.com"
github = "yxli2123"
linkedin = "yixiao-li-90710b209"


#[permalinks]
#page = "/:slug/"

[[menu.main]]
name = "HOME"
weight = -10
identifier = "home"
url = "/"

[[menu.main]]
name = "POST"
weight = 2
identifier = "post"
url = "/posts"

[[menu.main]]
name = "COURSE"
weight = 3
identifier = "course"
url = "/course"

[languages]
# edit this block for your own language
[languages.en]
lang = "en"
languageName = "English"
weight = 1

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true

```

### 5 Create a New Webpage

The webpage you are looking at is written by `html`, which is hard to write for beginners. However, you don't need to write your own webpage by `html`, all you need is MARKDOWN. If you are not familiar with Markdown, please read this: https://www.markdownguide.org/basic-syntax/

Now, suppose you have learn how to write `.md` file. Let's create a new webpage first by creating an `.md` file first.

Make sure your terminal is in the `./homepage` directory, to create a file, run

```bash
hugo new posts/my-first-post.md
```

This  `post/` is the sub directory of you website. For example, if you have a domain called http://www.homepage.com. Then this commend will create a file in http://www.homepage.com/posts/my-first-post/ 

CAUTION: You should always create a file in command line, rather than directly from the desktop.

To modify your file, you can either use VIM in terminal or other application like [Typora](https://typora.io).

### 6 Post Your Webpage

Keep mind that all your file is written in Markdown. Now let's post them into HTML files that can be directly upload to your server.

```bash
hugo -D
```

This command will create a directory called `./public`. You can upload this directory to your server now.

If you want to explore it in local, the run

```bash
hugo server -D
```
