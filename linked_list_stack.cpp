// Stack implementation using a linked list (C++)
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    explicit Node(int value) : data(value), next(nullptr) {}
};

class LinkedListStack {
private:
    Node* topNode;

public:
    LinkedListStack() : topNode(nullptr) {}
    ~LinkedListStack() {
        while (topNode != nullptr) {
            Node* oldTop = topNode;
            topNode = topNode->next;
            delete oldTop;
        }
    }

    bool isEmpty() const { return topNode == nullptr; }

    void push(int value) {
        Node* newNode = new Node(value);
        newNode->next = topNode;
        topNode = newNode;
        cout << value << " pushed onto the stack.\n";
    }

    void pop() {
        if (isEmpty()) {
            cout << "Stack Underflow! The stack is empty.\n";
            return;
        }
        Node* oldTop = topNode;
        cout << oldTop->data << " popped from the stack.\n";
        topNode = topNode->next;
        delete oldTop;
    }

    void peek() const {
        if (isEmpty()) cout << "Stack is empty.\n";
        else cout << "Top element: " << topNode->data << '\n';
    }

    void display() const {
        if (isEmpty()) {
            cout << "Stack is empty.\n";
            return;
        }
        cout << "Stack (top to bottom): ";
        for (Node* current = topNode; current != nullptr; current = current->next)
            cout << current->data << ' ';
        cout << '\n';
    }
};

int main() {
    LinkedListStack stack;
    int choice, value;
    do {
        cout << "\n--- LINKED-LIST STACK ---\n1. Push\n2. Pop\n3. Peek\n4. Display\n0. Exit\nChoice: ";
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
