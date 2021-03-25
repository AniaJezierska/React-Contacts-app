import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };
  state = {
    query: "",
  };

  /*
   *When user enters text into the input field the onChange event listener invokes the updateQuery() function.
   * updateQuery() then calls setState(), merging in the new state to update the component's internal state.
   * Because its state has changed, the ListContacts component re-renders.
   */

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };
  clearQuery = () => {
    this.updateQuery("");
  };
  render() {
    const { query } = this.state;
    const { contacts, onDeleteContact } = this.props;

    const showingContacts =
      query === ""
        ? contacts
        : contacts.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase())
          );

    /*
     *the value attribute is set on the <input> element.
     *Since the displayed value will always be the value in the component's state, we can treat state, then, as the "single source of truth" for the form's state.
     */

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />{" "}
          <Link to="/create" className="add-contact">
            Add Contact{" "}
          </Link>{" "}
        </div>
        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              {" "}
              Now showing {showingContacts.length} of {contacts.length}{" "}
            </span>{" "}
            <button onClick={this.clearQuery}> Show all </button>{" "}
          </div>
        )}
        <ol className="contact-list">
          {" "}
          {showingContacts.map((contact) => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`,
                }}
              ></div>{" "}
              <div className="contact-details">
                <p> {contact.name} </p> <p> {contact.handle} </p>{" "}
              </div>{" "}
              <button
                onClick={() => onDeleteContact(contact)}
                className="contact-remove"
              >
                Remove{" "}
              </button>{" "}
            </li>
          ))}{" "}
        </ol>{" "}
      </div>
    );
  }
}
/*
 *Link is a straightforward way to provide declarative navigation around *your application. By passing a to property to the Link component, you *tell your app which path to route to.
 */

export default ListContacts;
