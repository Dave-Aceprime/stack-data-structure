// Stack application: a simple Undo text editor (C++)
#include <iostream>
#include <string>
#include <stack>
#include <limits>
using namespace std;

int main() {
    stack<string> undoStack;
    string currentText;
    int choice;

    cout << "Enter initial text: ";
    getline(cin, currentText);

    do {
        cout << "\n--- UNDO TEXT EDITOR ---\n";
        cout << "Current text: " << currentText << "\n";
        cout << "1. Replace text\n2. Undo\n3. Show text\n0. Exit\nChoice: ";
        if (!(cin >> choice)) break;
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        if (choice == 1) {
            // Save the current state before changing it.
            undoStack.push(currentText);
            cout << "Enter replacement text: ";
            getline(cin, currentText);
            cout << "Change saved. You can undo it.\n";
        } else if (choice == 2) {
            if (undoStack.empty()) {
                cout << "Nothing to undo.\n";
            } else {
                currentText = undoStack.top();
                undoStack.pop();
                cout << "Undo complete.\n";
            }
        } else if (choice == 3) {
            cout << "Current text: " << currentText << '\n';
        } else if (choice != 0) {
            cout << "Invalid choice.\n";
        }
    } while (choice != 0);

    cout << "Goodbye.\n";
    return 0;
}
