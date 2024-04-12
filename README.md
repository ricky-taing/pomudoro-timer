# Pomudoro "Rainpuff" Timer

Fully customizable Pomodoro Timer based on Pomu Rainpuff. Don't like the theme? Change the background color, background image and sounds or add your own. 

## Why

In order to honor Pomu Rainpuff who has now graduated from Nijisanji as of January 2024 and build a timer that users can make their own. The original idea came from Pomu and Pomodoro sounding similar.

## Quick Start

You must have [Node.js](https://nodejs.org/en/download/) and
[npm](https://www.npmjs.com/get-npm) installed on your machine. This project was
built against the following versions:

Node v13.13.0
npm v6.14.5

Clone this repository to your local machine with:

```bash
$ git clone https://github.com/ricky-taing/pomudoro-timer.git
```
Run the following commands to install dependendencies and open app in browser on localhost:

```bash
$ npm install
$ npm start
```

## Usage

The timer features three different modes: Pomudoro, Short Break and Long Break which are 25, 5 and 15 minutes by default. The user can change how long each session or break is through the Settings Menu.

## To-Do List, Contributions

Priority 1: Pomufication  
Priority 2: Functionality  
Priority 3: Stretch Goals  

1. Add a license
    1. I'm not sure which is appropriate since I started this project off a tutorial (looking at you package.json 😬 )
2. Fix Notifications on Google Chrome (works on Firefox)
3. ~~Change background image to Pomu~~
4. ~~Change ring, button sounds to Pomu sounds~~
    1. Big PP Energy, ~~OtsuPP~~, "you're pretty good"
5. Implement Settings Menu
    1. ~~Allow users to change how long a session or break is~~
    2. Allow users to change theme to Lazulight members Elira, Finana or add their own background color, image 
    3. ~~Button -> New Page~~
    4. Button -> Pop-up is faster and also takes less resources?
6. ~~Display and track sessions so I don’t have to keep another tab open~~
7. Add option to change how many work sessions before long break
8. Change favicon to Pomu-themed icon

Settings Menu Approaches:
1. One slider, get global mode, changes time for current mode
   1. Pro - potentially reduce duplicate code
   2. Con - have to switch mode, then change time
2. Three sliders, one for each mode
   1. Pro - can change time for each mode from one page
   2. ~~Con - potentially duplicate code~~ Can I listen to the set of sliders for an event?
   3. ~~Con - Moving any slider for any mode changes text for current mode's clock~~

Settings Menu Problems:
1. ~~Timer doesn't actually update until switch modes...~~
2. ~~Sessions increment whenever hit start/stop button instead of only after session ends~~

Changing Background Image:
1. Upload file
2. Pass file into function which modifies css

## Stretch Goals
1. Write test cases such as verifying one session leads to the next
2. Secure app (https)
3. Package so users can install and run app without the code or send a link
4. Build my own HTML page with styling
5. Add functionality for different platforms such as mobile (Media Queries?)
6. Add option to count down sessions instead of count up
7. Add option to change seconds on timer

## Citations

- Original [Pomodoro Timer Tutorial](https://freshman.tech/pomodoro-timer/) provided by Ayooluwa Isaiah aka Freshman-tech
- Kamiinoodles Art [@KamiiRkgk](https://twitter.com/KamiiRkgk/status/1744357376105308575/photo/1)
- 玖条イチソ Art [@kujouitiso](https://twitter.com/kujouitiso/status/1748553496004321470)
- 雪丸めん Art [@mo_9x9](https://twitter.com/mo_9x9/status/1499690249387388928/photo/1)
- Audio clipped with Clipchamp