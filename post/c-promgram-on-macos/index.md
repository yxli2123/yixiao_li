---
title: C programming on macOS for beginners
subtitle: For beginners, especailly the 1st-year undergraduates

# Summary for listings and search engines
summary: C programming

# Link this post with a project
projects: []

# Date published
date: "2021-10-21T00:00:00Z"

# Date updated
lastmod: "2021-10-21T00:00:00Z"

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
- Course
- C/C++

categories:
- Tutorials
---

在Mac OS中有一些非常不错的IDE可以使用，我们介绍2种，Xcode、CLion

我们推荐使用Xcode

# 1. Xcode

Xcode是Apple自家的软件，在App Store安装即可。Xcode比较大，有10GB，请腾出足够的硬盘空间。

此外，Xcode只有英文，没有中文。

## 1.1 创建一个项目

所有IDE都是为了一个项目(project)服务的，所以即使要写一个简短的C语言程序，也要先创建一个项目。

打开Xcode，看到一个欢迎界面，如下图

<img src="./0_welcom_page.png" alt="0_welcom_page" style="zoom:43%;" />

单击 Create a new Xcode project, 进入选择程序类型、命名和目录的选择等环节。

点击macOS，选择Command Line Tool

<img src="./1_choose_type.png" alt="1_choose_type" style="zoom:25%;" />

输入项目名称(Project Name)。Organization Identifier在个人开发中不重要，但必须填写。语言选择C语言。

<img src="./2_name.png" alt="2_name" style="zoom:25%;" />

选择你喜欢的路径，在这个目录下将创建一个文件夹，名字即刚才的项目名称。点击Create后，Xcode将创建`.xcodeproj` 文件，来管理源代码和库函数等。

<img src="./3_directory.png" alt="3_directory" style="zoom:25%;" />

## 1.2 书写源代码

创建完项目后，Xcode会进入项目配置文件，如下图。

<img src="./4_overview.png" alt="4_overview" style="zoom:25%;" />

我们在这个界面不做任何操作，点击main.c即可，进入如下图的文本编辑

<img src="./5_write_code.png" alt="5_write_code" style="zoom:25%;" />

我们可以在中间书写源代码了。

Xcode的纠错功能是实时的，红色代表error，黄色代表warning。如果没有error则可以顺利编译并运行。

## 1.3 编译并运行

编辑好后，单击左上角的▶️，即可编译并运行

<img src="./6_run_code.png" alt="6_run_code" style="zoom:25%;" />

整个程序的输入输出在最下面，如果没有自动弹出来，可以用鼠标拉出来。

<img src="./7_IO.png" alt="7_IO" style="zoom:25%;" />

## 1.4 调试

当程序出错时，我们希望知道哪个地方出错了。一个可行的办法是设置断点。当程序运行到断点指定的行时，程序暂停。此时我们可以查看程序的所有变量，看这些变量是否符合我们的预期，以此来查找bug

单击代码区的行数，即可设置断点，然后正常运行即可

<img src="./8_debug.png" alt="8_debug" style="zoom:25%;" />

程序运行到断点时，我们可以查看各种变量。

<img src="./9_debug.png" alt="9_debug" style="zoom: 25%;" />

底部的变量时当前函数的，如果想要查看其他函数的变量，左侧单击想要查看的变量即可。

程序中断后，有3种继续程序的操作模式：continue、step over和step in

- Continue：继续运行程序，直到程序结束或者遇到下一个断点
- Step over：运行断点所在行的代码。
  - 如果断点所在行有函数，则执行函数，运行该函数并跳转到该函数的出口，即return行。该功能适用于，不进入函数，只查看函数最终的返回变量。
  - 如果断点所在行是个表达式，则执行表达式，跳转到该行的下一行。
- Step in：运行断点所在行的代码。
  - 如果断点所在行有函数，则执行函数，运行至该函数入口，即该函数的第一行。该功能适用于想要一步一步追踪代码的运行，并查看子函数的情况。注意⚠️：如果跳转到汇编语言（你看不懂的语言），请按这个键右边的step out，跳出来。
  - 如果断点所在行是个表达式，则执行表达式，跳转到该行的下一行。

<img src="./10_debug.png" alt="10_debug" style="zoom:25%;" />

# 2. CLion

[CLion](https://www.jetbrains.com/clion/)是JetBrain公司开发的跨平台的IDE，支持Windows、macOS和Linux。相比于Xcode，CLion更轻便，只有2GB左右。

如果你今后要使用Python，那么我们也推荐JetBrain公司的Pycharm，一款专注于Python开发的IDE。

JetBrain公司的软件都是收费的，但我们可以使用学校邮箱注册，获得使用权。

下载并安装后，我们开始使用Clion

## 2.1 创建一个项目

同Xcode一样，所有IDE都是为了一个项目(project)服务的，所以即使要写一个简短的C语言程序，也要先创建一个项目。

打开CLion后，弹出一个欢迎界面

<img src="./11_welcom.png" alt="11_welcom" style="zoom:43%;" />

点击New Project后，选择合适的语言、编译版本和项目路径。

<img src="./12_welcom.png" alt="12_welcom" style="zoom:43%;" />

## 2.2 书写源代码

创建好项目后，即可开始书写代码。左边是项目文件夹结构，右边是代码编辑区。

<img src="./13_overview.png" alt="13_overview" style="zoom:25%;" />

## 2.3 编译并运行

点击绿色的小箭头即可运行代码。

<img src="./14_run_code.png" alt="14_run_code" style="zoom:25%;" />

程序的输入输出交互窗口在最下面。程序运行后会自动弹出。

<img src="./15_IO.png" alt="15_IO" style="zoom:25%;" />

## 2.4 调试

CLion的Debug和Xcode的Debug模式的进入不一样。在Xcode中，我们设置断点后，直接运行程序即可debug。在CLion中，我们设置断点后，需要进入Debug模式，而不是直接运行代码。

<img src="./16_debug.png" alt="16_debug" style="zoom:25%;" />

调试的3种模式和Xcode的一模一样，就不再赘述。

<img src="./17_debug.png" alt="17_debug" style="zoom:25%;" />
