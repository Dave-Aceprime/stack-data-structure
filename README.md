# Stack Data Structure Project

## Contents
- `index.html`, `style.css`, `script.js`: deployable interactive web application.
- `array_stack.cpp`: menu-driven C++ stack implemented with a fixed-size array.
- `linked_list_stack.cpp`: menu-driven C++ stack implemented with a linked list.
- `undo_stack_application.cpp`: C++ application demonstrating an Undo feature using a stack.

## Web app features
1. Switch between array and linked-list demonstrations.
2. Push, pop, peek, and clear values.
3. Array stack shows overflow when more than five values are pushed.
4. Linked-list demo grows dynamically.
5. Undo editor saves previous text states and restores the most recent state first.

## Deploy to Netlify
1. Extract the ZIP file.
2. Open Netlify and sign in.
3. From the Netlify dashboard, choose **Add new site** / **Deploy manually** (wording may vary).
4. Drag the project folder containing `index.html`, `style.css`, and `script.js` into the manual deploy drop zone. If Netlify asks for a publish directory, use the project root.
5. Wait for deployment, open the generated `https://...netlify.app` URL, and test the buttons.
6. Copy the live URL into your assignment submission.

The web app is static and requires no build command or server-side environment variables.

## Compile the C++ programs
With a C++ compiler such as g++:
- `g++ array_stack.cpp -o array_stack`
- `g++ linked_list_stack.cpp -o linked_list_stack`
- `g++ undo_stack_application.cpp -o undo_stack_application`

Run the generated executable after compilation.

## Stack concept
A stack follows LIFO (Last In, First Out). Push adds an item to the top; pop removes the top item; peek reads the top item without removing it. Array stacks have a fixed capacity in this example, while linked-list stacks grow as memory is available.
