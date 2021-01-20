const layout = require("./layout");
const { nameError } = require("../helpers");

module.exports = ({ errors }) => {
  return layout({
    header: "Register",
    content: `<form class="ui equal width form error" method="POST" action="register">
                    <div class="fields">
                         <div class="required field">
                              <label>Name</label>
                              <input type="text" name="name" placeholder="First Name">
                              ${nameError("name", errors)}
                         </div>

                         <div class="field">
                              <label>Last Name</label>
                              <input type="text" name="lastName" placeholder="Last Name">
                         </div>                         
                    </div>

                    <div class="required field">
                         <label>Email</label>
                         <input type="text" name="email" placeholder="Email">                            
                    </div>
                    ${nameError("email", errors)}

                    <div class="required field">
                         <label>Password</label>
                         <input type="password" name="password" placeholder="Password" type="password">                              
                    </div>
                    ${nameError("password", errors)}

                    <div class="required field">
                         <label>Date of Birth</label>
                         <input type="date" name="birthDay" placeholder="Date of Birth" type="date">
                    </div>
                    ${nameError("date", errors)}
                         <button class="ui button" type="submit">Submit</button>
               </form>`,
    extraContent: `<a href="/login"><i class="user icon"></i> Already have an account? Sign In</a>`,
  });
};
