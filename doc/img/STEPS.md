### Adding the frontend

1. Create the workspace, using the `Angular` preset:

   $ npx create-nx-workspace@latest

<TODO img 01>

2. Test that the app starts properly:

   $ nx serve ui

you should see something like this in the console

<TODO img 02>

and this in the UI

<TODO img 03>

3. Some TDD using integration tests, stop previous command, and run: `nx e2e ui-e2e --watch`
   When the pop-up is loaded, click on `Run one integration test`

<TODO img 04>

It will fail, because weŕe still showing the default welcome screen.

<TODO img 05>

So let's add some code to get our test to pass.

4. Generate a new component: `nx g c roster`

<TODO img 06>

...
etc. I hate TDD

#### Adding services to use the API

1. Create a service: `npx ng g service roster`

### Adding the backend

1. Install Express on nx: `npm install --save-dev @nrwl/express`

2. Generate a new Express project: `npx nx g @nrwl/express:app api --frontendProject=ui`
