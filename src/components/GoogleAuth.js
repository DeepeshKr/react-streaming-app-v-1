import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '288197485246-kb35dfk8o1s9agia8fuk85dkikrlo64a.apps.googleusercontent.com',
        scope: 'email',
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn)
    {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else  {
      this.props.signOut();
    }
    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  onSignInClick = () => this.auth.signIn();

  inSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null)
    {
      return null;
    } else if (this.props.isSignedIn)
    {
      return (
      <button className="ui red google button" onClick={this.inSignOutClick}> 
        <i className="google icon" />Sign Out
      </button>
      )
    } else {
      return (<button className="ui green google button" onClick={this.onSignInClick}> 
      <i className="google icon" />Sign In with Google
        </button>)
    }
  }



  render () {
    return <div>{this.renderAuthButton()} </div>;
  }
}

  const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
  }

export default connect(mapStateToProps, {signIn, signOut}) (GoogleAuth);