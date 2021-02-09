const layout = require("./layout");
const { nameError } = require("../helpers");
const { googleLogin } = require("../../js/socialLogin");

module.exports = ({ errors, dbError }) => {
  return layout({
    header: "Sign In",
    content: `${dbError ? nameError(null, dbError) : ""}           
               <form class="ui form error" method="POST" action="login">

                    <div class="field center aligned">
                         <a class="ui negative basic button" id='googleLogin' onClick='${googleLogin()}  '>
                              <i class="google  icon"></i>
                              Google 
                         </a>

                         <a class="ui secondary basic button" id='emailLinkLogin'>
                              <i class="envelope outline icon"></i>
                              Google 
                         </a>    
                         
                         <a class="ui facebook button" id='facebookLogin'>
                              <i class="facebook icon"></i>
                              Facebook 
                         </a>  

                         <a class="ui twitter button" id='twitterLogin'>
                              <i class="facebook icon"></i>
                              Twitter 
                         </a> 
                    </div>
                                        
                    <div class="required field">
                         <label>Email</label>
                         <input type="text" name="email" placeholder="email"> 
                    </div>
                    ${nameError("email", errors)}                     

                    <div class="required field">
                         <label>Password</label>
                         <input type="password" name="password" placeholder="password" type="password" >
                    </div>
                    ${nameError("password", errors)} 
                                        
                    <button class="ui button" type="submit">Submit</button>
               </form>`,
    extraContent: ` <a href="/register">
                         <i class="user icon"></i>
                         Don't have an account?
                    </a>
                    <a href="/forgot" class="right floated">
                         <i class="info icon"></i>
                         Forgot your password?
                    </a>
                    `,
  });
};
