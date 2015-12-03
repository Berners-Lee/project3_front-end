# Readme

### Prompt

Create an e-commerce site for famed retail giant, Nozama! Naturally, the site will need to allow customers to see all of Nozama's products, add those items to a shopping cart, and purchase them using Stripe. In addition, by logging in, customers should be able to keep track of their purchases by looking at their past orders.

### About

Nozama (built by Team Berners-Lee: Dave, Meng, and Sarabrent), is an e-commerce site for the college-bound. We sell products in four categories: Dorm, School, Food, and Fun. Users can
- register,
- log in,
- browse items -- all, or by category (because maybe they do/don't know what they're looking for),
- search by exact match in product titles (because maybe they know exactly what they're looking for, or at least partially),
- add things to a cart, including multiples of a product,
- delete things from a cart,
- check out and pay using Stripe (because it's "easy"),
- keep track of past orders, by date (because maybe they want to remember what brand or size they like),
- logout, and
- retrieve the contents of their cart from a previous session (because maybe they forgot/had to go/couldn't remember their credit card number right then and there).

On the front end, we used

- Javascript
- jQuery
- Ajax
- HTML / CSS

### Approach

##### First, data models: 

Before coding, we organized our data models early on, though we were still struggling to understand how Mongo DB databases could work together and reference one another. We would later, during project week, feel inconclusive about our decision to use an Order model, later ditching it (in favor of simply nesting orders within our product and profile collections), then later-er (that same day) being told (and believing) that nesting was bad, and resuming our use of an Order model. We're really glad we did; when we needed to pull multiple orders, it was a lot easier to point to the same model. The day before Thanksgiving break, we set up our repos and wrote code for our models. 

##### Project week:
- We spent the first day of project week trading turns at a single computer, for controllers and CRUD work. As a habit we would keep all week, we sat by a whiteboard and wrote our goals down and crossed them off as we completed them. This was helpful for familiarizing ourselves with new Node and Express processes and getting a sense of teammates' strengths and weaknesses. 
- Days 2-4 we worked on our own computers, on individual tasks, most often of small-to-medium scale. We often worked together, sometimes to debug for hours, sometimes for a thirty-second Q&A, but for nearly all pieces of functionality and styling there was an individual lead. This method proved particularly helpful with version control. We still had a few merge conflicts, some of which we don't really understand at all, but we were pretty good about pulling-and-pushing when we needed to (pulling, always), and we never lost anything too serious -- nothing a check-in with our teammates and a re-clone from GitHub couldn't fix. Our workflow was something of a Feature Branch Workflow, with a lot of verbal communication. We all sat at the same table all week. 

### Reflecting
##### Hurdles
- Finding the right way to use Stripe, giving Stripe the data it wanted 
- Saying yes then no then yes to an Object model
- Remembering to breathe when we had a merge conflict

##### Unsolved issues

???

### Wireframes and planning


### Other things you should know
* [Deployed front-end] 
* [Backend repo] 

[Backend repo]: <https://github.com/Berners-Lee/project3_back-end>
[Deployed front-end]: <>
