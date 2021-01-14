const layout = require("./layout");
const { getError } = require("../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div class="ui two column centered grid">
     <div class="ui card column">
               <div class="content">
                    <div class="header">Register</div>
               </div>

               <div class="content">
                    <form class="ui form error" method="POST" action="register">

                         <div class="field">
                              <div class="two fields">
                                   <div class="required field">
                                        <label>Name</label>
                                        <input type="text" name="name" placeholder="First Name">
                                        <div class="ui error message">
                                        ${getError(errors, "name")}
                                   </div>
                                        </div>
                                   <div class="field">
                                        <label>Last Name</label>
                                        <input type="text" name="last_Name" placeholder="Last Name">
                                   </div>
                              </div>                     
                         </div>

                         <div class="required field">
                              <label>Email</label>
                              <input type="text" name="email" placeholder="Email">    
                              ${getError(
                                errors,
                                "email"
                              )}                         
                         </div>

                         <div class="required field">
                              <label>Password</label>
                              <input type="text" name="password" placeholder="Password" type="password">
                              ${getError(errors, "password")}
                         </div>

                         <div class="required field">
                              <label>Date of Birth</label>
                              <input type="text" name="date" placeholder="Date of Birth" type="date">
                              ${getError(errors, "date")}
                         </div>

                         <button class="ui button" type="submit">Submit</button>
                    </form>
               </div> 

               
               <div class="extra content">
                    <a href="/login">
                         <i class="user icon"></i>
                         Already have an account? Sign In
                    </a>
               </div>
          </div>
    </div>

    `,
  });
};
