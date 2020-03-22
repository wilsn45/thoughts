import React from "react";
    import { GiftedChat } from "react-native-gifted-chat";


    const SignUpState={
    	"phoneNumber": "We need to know your phone number, please help us with it. Dont forget to add country code",
    	"invalidPhoneNumber": "enter valid number please",
    	"otc": "we just sent you an one time code, please let us know that",
    	"guidelines1": "Guidelines 1",
    	"guidelines2": "Guidelines 2",
    	"confirm": "Get In"
	};

    export default class ChatScreen extends React.Component {
      state = {
        messages: [],
        signUpState: "phoneNumber",
        number: "number",
        otc: "otc",
        systemMessageId : 1
      };

      componentDidMount() {
        this.setState({
          messages: [
            {
              _id: 1,
              text: "Hola! Welcome to thoughts, a place to speak your heart out",
              createdAt: new Date(),
              user: {
                _id: 1,
                name: "thoughts",
              }
            }
          ]
        });

        this.thoughts(SignUpState["phoneNumber"]);
      }

       thoughts(message) {
       	
       	this.setState( {
       		systemMessageId : this.state.systemMessageId + 1
       	})
       	setTimeout(() => {

       		let nextMessage = {
       		  _id: this.state.systemMessageId,
              text: message,
              createdAt: new Date(),
              user: {
                _id: 1,
                name: "thoughts",
              }
            }
            this.setState(previousState => ({
    	    messages: GiftedChat.append(previousState.messages, nextMessage),
  		  }))
       	}, 1500)

       	

	  }

	  validateOtc(otc) {
		 var re = /\[0-9]/;
		 console.log(re.test(number))


         if (re.test(number) && number.length > 4 && number.length < 4) {
         	this.thoughts(SignUpState["otc"]);
         }
         else {
         	this.thoughts(SignUpState["invalidOtc"]);
         }
      }

	 validatePhoneNumber(number) {
		 var re = /\+[0-9]/;
		 console.log(re.test(number))


         if (re.test(number) && number.length > 7 && number.length < 15) {
         	this.thoughts(SignUpState["guidelines1"]);
         }
         else {
         	this.thoughts(SignUpState["invalidPhoneNumber"]);
         }
      }


      onInput(messages = []) {
       		this.setState(previousState => ({
    	  messages: GiftedChat.append(previousState.messages, messages),
  		  }))

    	if (this.state.signUpState == "phoneNumber") {
    		this.validatePhoneNumber(messages[0].text)
       	}
       	else if (this.state.signUpState == "otc") {
       		this.validateOTC()
       	}
       	else {

       	}

  	  }

      render() {
        return <GiftedChat  messages={this.state.messages} 
             onSend={messages => this.onInput(messages)}
        						user={{
         								 _id: 2,
       								 }}
        />;
      }
    }