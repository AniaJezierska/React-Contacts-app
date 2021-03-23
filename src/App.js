import React, {
  Component
} from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import {
  Route
} from 'react-router-dom';


class App extends Component {
  /* 
   * The list of contacts is the first of the identified states.
   * "contacts" should be an array as this is the best way to represent them.
   */
  state = {
    contacts: []
  }

  /* 
   * componentDidMount() method is called when the component is created.
   * Once the component has been mounted, the componentDidMount() lifecycle event occurs.
   * The getAll() method from the ContactsAPI is run and all the contacts are downloaded from the contacts database. When the data is returned, setState() is called and  the contacts array is updated to its state. Since the state has changed, render() gets called again and this re-renders the page with the contacts having a state.
   */

  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }))
      })
  }

  // return a new array that filters out the contact we passed in
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))
    ContactsAPI.remove(contact)
  }

  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts: currentState.contacts.concat([contact])
        }))
      })
  }

  render() {
    return ( <
      div >
      <
      Route exact path = "/"
      render = {
        () => ( <
          ListContacts contacts = {
            this.state.contacts
          }
          onDeleteContact = {
            this.removeContact
          }
          />
        )
      }
      /> <
      Route path = "/create"
      render = {
        ({
          history
        }) => ( <
          CreateContact onCreateContact = {
            (contact) => {
              this.createContact(contact)
              history.push("/")
            }
          }
          />
        )
      }
      /> <
      /div>
    );
  }
}

export default App;