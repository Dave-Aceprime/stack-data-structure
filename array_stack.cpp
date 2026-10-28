// Stack implementation using an array (C++)
#include <iostream>
using namespace std;

const int MAX = 5;

class ArrayStack {
private:
    int items[MAX];
    int topIndex;

public:
    ArrayStack() : topIndex(-1) {}

    bool isEmpty() const { return topIndex == -1; }
    bool isFull() const { return topIndex == MAX - 1; }

    void push(int value) {
        if (isFull()) {
            cout << "Stack Overflow! The stack is full.\n";
            return;
        }
        items[++topIndex] = value;
        cout << value << " pushed onto the stack.\n";
    }

    void pop() {
        if (isEmpty()) {
            cout << "Stack Underflow! The stack is empty.\n";
            return;
        }
        cout << items[topIndex--] << " popped from the stack.\n";
    }

    void peek() const {
        if (isEmpty()) cout << "Stack is empty.\n";
        else cout << "Top element: " << items[topIndex] << '\n';
    }

    void display() const {
        if (isEmpty()) {
            cout << "Stack is empty.\n";
            return;
        }
        cout << "Stack (top to bottom): ";
        for (int i = topIndex; i >= 0; --i) cout << items[i] << ' ';
        cout << '\n';
    }
};

int main() {
    ArrayStack stack;
    int choice, value;
    do {
        cout << "\n--- ARRAY STACK ---\n1. Push\n2. Pop\n3. Peek\n4. Display\n0. Exit\nChoice: ";
        if (!(cin >> choice)) return 0;
        switch (choice) {
            case 1: cout << "Value: "; cin >> value; stack.push(value); break;
            case 2: stack.pop(); break;
            case 3: stack.peek(); break;
            case 4: stack.display(); break;
            case 0: cout << "Exiting.\n"; break;
            default: cout << "Invalid choice.\n";
        }
    } while (choice != 0);
    return 0;
}
