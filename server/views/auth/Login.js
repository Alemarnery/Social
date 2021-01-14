const layout = require("./layout");
const { getError } = require("../helpers");

module.exports = ({ errors }) => {
  const name_error = (input_name) => {
    console.log(input_name);
    //     return `<div class="ui error message>
    //         ${getError(errors, input_name)
    //         </div>`;
  };
  return layout({
    content: `
    <div class="ui two column centered grid">
     <div class="ui card column">
               <div class="content">
                    <div class="header">Sign In</div>
               </div>

               <div class="content">
                    <form class="ui form error" method="POST" action="login">

                         <div class="required field">
                              <label>Email</label>
                              <input type="text" name="email" placeholder="email"> 
                              ${errors ? name_error("email") : ""}


                         <div class="ui error message">
                              ${getError(errors, "email")}
                         </div>

                         </div>
                         <div class="required field">
                              <label>Password</label>
                              <input type="text" name="password" placeholder="password" type="password" >
                              <div class="ui error message">
                                   ${getError(errors, "password")}
                              </div>
                         </div>
                         <button class="ui button" type="submit">Submit</button>
                    </form>                    
               </div> 

               <div class="extra content">
                    <a href="/register">
                         <i class="user icon"></i>
                         Don't have an account?
                    </a>
                    <a href="/forgot" class="right floated">
                         <i class="info icon"></i>
                         Forgot your password?
                    </a>
               </div>
          </div>
    </div>
    `,
  });
};
