const layout = require("./layout");
const { getError } = require("../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div class="ui two column centered grid">
     <div class="ui card column">
               <div class="content">
                    <div class="header">Recovery your password</div>
               </div>

               <div class="content">
                    <form class="ui form error" method="POST" action="forgot">
                    <h5>Enter your email to recovery your password</h5>
                    

                         <div class="required field">
                              <label>Email</label>
                              <input type="text" name="email" placeholder="Email">  
                              ${getError(
                                errors,
                                "email"
                              )}                         
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
