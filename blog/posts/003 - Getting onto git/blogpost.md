My dad always said, "If something's worth doing, it's worth doing right."  I'm pretty sure the quote isn't original to him, but it's always stuck with me.  In fact, I'm not even sure he actually said it to me, but he was always sure to make the point that if we were going to start a project, we were going to go all in and make it worth the effort.

That's probably why when I first set up this site, I didn't want to just do it the easy way and be done with it.  The easy way being a managed WordPress hosting, a stock theme, add posts in the admin section or FTP in and update files directly on the server.

Something inside of me said, "You can do better than that." I am thankful for that voice, even though the initial frustration it caused me led to an entire weekend banging out different solutions until I found the __right one__.

The good that came out of this work is undeniable, and I can be 100% sure that the benefits absolutely outweighed the pains taken. 

Enough patting myself on the back; what I really want is to share what I had to go through to get a WordPress site on an independent host set up with version control, mistakes and all.  And more importantly, to talk it out without assuming any prior knowledge.

## Let me take you back...

to my prior self.  I wanted to set up a website on a real domain, with real hosting that I control, to serve as a place to put my proverbial self out there.  Simple.

As I was sure I was not the first to want this, I turned to my old friend the Net to seek out help.  And help there was, in abundance. There is no lack of suggestions for content management, hosting, one-click installs, 5-minute setups, 6-minute abs, South Beach diets..._ad infinitum_.

You get where this is going.  Most people want to encourage doing things the easy way, not overcomplicating life, offering the shortest (and often most uninteresting) route from A to B.  Productivity is king!

Before I make my short story too long, I'll say I had pretty much decided on WordPress for content management.  In general, I did this for two reasons:

1. WordPress is everywhere, so it's likely not going away any time soon. Consequently, it's also __extremely__ well-documented.
2. WordPress is highly customizable.  If you want to get your hands dirty, you can dig yourself one heck of a rabbit hole.

Hosting was also a fairly easy decision, though motivated by another truism: "You get what you pay for."  I wanted a service that would accomodate my present needs while allowing for expansion as I evolve as a developer.  Media Templa offered this, as well as a lot of CMS integrations, and came with the (albeit paid) recommendation of a trusted source<sup>*</sup>. I ponied up.

<sup>*</sup>_[CSS Tricks](https://css-tricks.com), a plethora of knowledge waiting to be tapped_

## Let me help you...

help yourself.  CMS. Check.  Hosting. Check.  Domain name. Check.  Now what?

The most common responses to this take two forking paths:

1. /wp-admin.  Go there.  Add content.  Click Update.
2. FTP.  Download FileZilla.  Connect via __S__FTP (this is good advice) to you server.  Transfer your files to the server.

Option (1) seemed too easy. Not the developer's route, and surely not the scenic one. I started with option (2).  FileZilla on my machine.  Server credentials entered.  There I am, staring at my server's file system.  Something didn't feel right.

Even the most inconsequential snippets of code I write are kept in version control in some form or another.  I have local files linked to GitHub repositories.  I mock up in CodePen.  I run local servers to test versions.

Why on Earth would I want to bypass this on something __live__ and __public__ and most importantly, entirely representative of __me__? Even Chris Coyier of the aforementioned CSS-Tricks got himself off the FTP IV-drip and onto version control some years ago.  He even documented the process on [video](https://www.youtube.com/watch?v=cUeMF18zA4Y&t), which was the inspiration for my own mistrust of direct modification of server files.

So option (2) was out the window.  FileZilla, sorry but you had to go.  I followed the tutorial video and got to the point where my local dev server and my live site structure matched sufficiently.  That meant downloading a copy of my WordPress install from the server, downloading a fresh copy of WordPress, running the fresh copy through MAMP with it's own WordPress login and admin, and only changing files in the development environment.

That felt __so__ much better.

## Let me see...

what I can do with git.  I had my local copy of the live site, an identical copy for the development environment and a production build live on the server.

Now what?

My hosting service came with git pre-installed on the server.  Great!  Surely they have documentation about linking that up with my local git repos.  Didn't they?

Well, yes and no.  Pre-installed does not a well-documented service make. (Shakespearean, no?)  I do not want to denigrate my hosting service as I am generally satisfied, but suffice it to say, their suggestion for integrating version control left some voids to be filled.  I don't blame them.  Giving novices tutorials on not-so-novice techniques for integrating third-party services on your complex server system is asking for trouble.

Thankfully, the info they did provide didn't get me into trouble. I `CTRL-Z`'d my way back to square one (metaphorically speaking).

At this point, I was beginning to rue the little "you should be doing this the right way" voice in my head.  Thankfully, I resisted the temptation to re-install FTP and get on with building my site.

## Let me let someone else...

give it the old college try.  Coyier's video tutorial outlines a deployment service for seamless integration of server-side versioning with git.  That's exactly what I wanted, and frankly my frustration was building.  Jut get me on git already!

I set up my free account on [Beanstalk](https://beanstalkapp.com) and went through their relatively easy set up precess.  You give them your domain name, and initiate a git repo.  Then you clone this repo down, commit some changes and push it back to beanstalk.

This was starting to sound familiar.  Cloning, committing, pushing.  I was already doing that.  So how does beanstalk actually deploy this repo to my live server?

Simple!  You just enter your server credentials in their system and they push your changes live.  With SFTP<sup>*</sup>.  Shit.

<sup>*</sup>_They do offer deployment through FTP and SSH as well, but that's beside the point._

So in order to have my site on version control with software that is installed both on my local machine and on the server, I have to give a third-party service my server credentials?  That doesn't seem right.  And it's not.

## Let me git...

this straight (see what I did there?).  I cannot imagine that the right way to keep a site properly version controlled involves sharing my credentials with someone else so they can handle the deployment for me.  This was starting to sound like the fast and loose approach from option (1) above<sup>*</sup>.

<sup>*</sup>_Again, I am not here to denigrate third-parties.  I am sure Beanstalk is a secure service and is right for a lot of people.  I wanted to have full control, so it was not the right choice for me._

I was sure there was a safe, easy and responsible way to handle versioning.  One of the consequences of my now repeated failure was understanding the challenges I now faced.  I formed a more reliable search query for my old friend Google, and was rewarded with the following two articles:

* [Git Deployments on Media Temple](https://ajfleming.info/git-deployments-on-mediatemple/), by Andrew Fleming
* [A web-focused Git workflow](http://joemaller.com/990/a-web-focused-git-workflow/), by Joe Maller

The latter of these two is the source material and the inspiration for the former.  A simple, two-repo system allows changes to be pushed to a blank repository (the Hub) on the server, which then alerts the working repository (Prime) to changes which it can pull to the live site.  The Hub lives outside the working directory on the server, and a system of hooks controls the passage of information from one repo to the other.

As Maller puts it, the system has some major advantages:

>* Pushing remote changes automatically updates the live site
>* Server-based site edits won’t break history
>* Simple, no special commit rules or requirements
>* Works with existing sites, no need to redeploy or move files

Fleming's article goes a long way in translating Maller's setup for those of us on Media Temple hosting.  Mostly, it is an adaptation of Maller's instructions for the specificities of the server's file system and credentialing.  But, barring the lack of information on where to register hooks in a git repo, it got me up and running in about half an hour.

Now I have a dev environment where I am free to screw up my site as much as I like before pushing those changes to the staging repo.  This staging repo is the local copy of what is live on the server and where I make commits for the Hub repo.  When I push changes up to the Hub, git hooks notify the working Prime repo of changes, which it then pulls down into the live repository. 

It really is a thing of beauty.

## Let me recap...

what I learned:

1. Doing things the right way is painful.
2. But it is absolutely worth it.
3. As long as you don't break something.
4. Knowing how to navigate information on the Internet is the most important soft skill a developer can have.
5. Some very good third-party services are essentially GUIs for processes you can often achieve from the command line.
6. Doing #5 is scary when you don't know what you're doing.  That's why software as a service exists.