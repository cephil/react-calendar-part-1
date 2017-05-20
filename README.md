# Part 1: Calendar from Pug, Now to React  
## Stateful Components, our App, and How We Should Refactor It  

Before, we had a calendar that was designed with Pug, LESS, and some JS/ES6. We've now converted this project over to a React project, which mimics the file structure that you would see on most React code bases (minus stateful components).

### What is a Stateful Component?

A stateful component is pretty well described in [this article](https://toddmotto.com/stateful-stateless-components), however to put it simply — "statefulness" means that the component you are creating has, creates, or god-forbid mutates state.

![Image of Stateful Component](https://s3-us-west-2.amazonaws.com/s.cdpn.io/52377/stateful-component.png)

In our example, all of the components which live in `./js/**/*.js` are stateful. They all use `Moment (moment.js)` to define the information they need, meaning that we're thinking from a upside-down perspective. Both the H1 and the H2 tags rely on lines 5-7 to recieve their values, which is a one way ticket to painting yourself into a corner when changes need to happen. The next project setup, we'll go through fixing these errors; but first lets explain some things.

Why is this bad? Let's say a user wanted to change the date on the calendar? This would cause you to have to create lifecycle methods on every single component you make, in order to render the update. The more awareness and need to execute methods in components that are state-based, the worse your application will perform.

### What is a Stateless Component? 
![Image of Stateless Component](https://s3-us-west-2.amazonaws.com/s.cdpn.io/52377/Screen%20Shot%202017-05-20%20at%201.14.47%20PM.png)  

Now I'm not saying **ALL** components **NEED** to be stateless, because that's an untrue assertion. However, imagine a scenario where we could modify one file, and from those modifications — our child components imported into `container.js` could recieve the values they needed, soley based on scope, or what's known as state and props in React?

Sounds a lot easier, and much more patternable, right? Instead of changing 4 files, we're able to modify one — much like you would in a traditional ES5 MVC style pattern.

### So What Does This Structure Look Like?

Depending on the needs of your application, you would most likely need a couple things added. For example, if you needed to have pages the user would navigate to, you would use something like `react-router`. If you were fetching data and wanting to store it for component sharing, you would use Redux `react-redux`. This is how React works: you bolt on what dependencies you need, and use them in the places they're required.

Most React applications which are API-driven with navigation (routes) use the above, and the pattern defined for such architecture is along the lines of the following:

![Image of React-redux Project Structure](https://s3-us-west-2.amazonaws.com/s.cdpn.io/52377/react-redux-structure.png). 

[This is a basic example of a React project that uses redux.](https://github.com/reactjs/redux/tree/master/examples/todos/src) It contains the following:

- Actions & Action Creators
- Reducers
- Containers
- Components
  
### Actions: From [redux.js](http://redux.js.org/docs/basics/Actions.html):

> Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.

Think about it from this perspective: Actions give information to something (a store), which eventually will update your application with data. It's, for all intensive purposes, a model for your application to store information in. Now there's a huge difference here from ES5 style approaches, which is known as immutability — which we'll get into later, but in short: manipulating data is a bad practice, because it abstracts your one true source from it's binding.

#### Action Creators: Again, from redux.js...

> Action creators are exactly that—functions that create actions. It's easy to conflate the terms “action” and “action creator,” so do your best to use the proper term.

This is basically exactly as described. A function or method which invokes the action itself. Your actions and action creators will typically live in the same file, and not spread out per component. Example:

```
/* action */
export const SELECT_DATE = 'SELECT_DATE';


/* ACTION CREATOR */
export function selectDate(date) {
	return { type: SELECT_DATE, date }
}

```
Pretty basic. If `selectDate()` is invoked, it expects to be given a `date`, which then becomes a point where you can update state. Which leads us into...

### Reducers: 

The sole job a reducer has is to handle the action invoked. You design the shape of your `state`, and then handle what the incoming action should do. The pattern looks like the following:

```
const calendars = (state, action) => {
	switch (action.type) {
		case 'SELECT_DATE':
			return {
				date: action.date
			}
		default: 
			return state
	}
}

export default calendars
```

You first create a constant, which takes two things: the state, and an action (from the action `SELECT_DATE` before) which you will match to a case in a switch statement in order to handle the incoming action, and the data being passed. Think of it this way, if I did the following:

```
selectDate("12-20-2017");
```
I would expect the value of `12-20-2017` to be invoked, and through the action & action creator I would pass through `selectDate("12-20-2017")` to  provide the reducer with both the state, and "12-20-2017" as the new date. The case statement of `SELECT_DATE` would return `date: action.date` as `date: "12-20-2017"`. Make sense so far?

The end of the reducers file allows us to use this across many different components, with different actions and creators that allow us to design stateless components that "react" to any change in data, or invocation of change. (Note to ES6 saavy people, I'm not going into the combineReducers for clarity purposes and to lessen complexity).

**REMEMBER! NEVER MUTATE STATE! IMMUTABILITY IS IMPORTANT!**

In old patterns of the ES5 world, it would be common to create a model that has a key: value, and later on change the design of it's structure. In the React world, doing such will cause you to write more code, edge cases, create uncaught exceptions, nullify your data, and give you a total headache. Let Redux and it's reducers do their work, and supply you with the information. On that note, we can move on to...

### Containers 
So we've talked about things you haven't seen, at all yet in this project. However, we do have a container - which imports all of our components. This is based on the idea of Atomic design theory. It's somewhat confusing at first, but bear with me on this. You have the following hierarchy: 

- Atoms: Smallest piece of the molecular chain. It's the smallest bit, which can be a part of something larger. In context, this could be a `button`, specific `style`, or single `icon` for example.
- Molecules: A grouping of atoms, which makes a larger piece of matter. Contextually, this could be the previous `button` with an `input` which makes up a part of a search bar. 
- Organisms: Organisms are comprised of both Molecules and Atoms, to make up a more complex user interface. This could be our `button` in multiple places, `input`s in various locations, and other components which help create a user information page where they can change such values and submit.
- Templates: Templates bring the mixture of Organisms, Molecules, and Atoms into shape. They are the skeleton and structure of a page. They are also not context dependant, however they define how, where, and when the previous items should be displayed.
- Pages: The. largest part of it all, the Page is entire UI comprised of Templates, Organisms, Molecules, and Atoms in order to bring all the smaller pieces together to make a whole. Think of pages as your landing destination. A search page, an index page, a user profile page, anything that comprises a whole complete set.

Ok, still a bit confusing, but it's the basis and theory of modularity and abstraction. You don't need one 10,000 line JavaScript file... you can break that same file down as you did with things like Require, Prototype.export, module patterning - just in a more efficient, organized, and easier to understand way. Even I, myself, stop and refer back to definitions when designing applications. Don't feel bad if you can't immediately break it down into all the pieces. An image that explains this very well, and [article where it's sourced](http://ubie.io/atomic-design/) also explains the the whole idea very well:

![Atomic Design Reference](https://s3-us-west-2.amazonaws.com/s.cdpn.io/52377/instagram-atomic.png)

Containers are essentially pages. They bring all the things together, and often are where we start as a place to feed it's children with data. This is the definition of "Stateless" components. They are dumb, and take whatever information is passed down the chain to render. If formatting needs to occur, or special cases for the data need to happen, they start from the top to bottom. Containers can pass data that an Organism needs, which the Organism can render correctly for the Molecule, and subsequently the Atom.

### What's Next?

Next, in part two — We'll break this example down and apply these principles. We've already split up things into components and have a single container, and the main `app.js` which renders the calendar to the page as a whole.  

The CSS, JavaScript, and everything will be broken apart to modularize what we have here in a way that's much more usefull. We can also bring in Redux, if we want to start working with user interactivity and storing data that we need for future purpose.
