function hideLogout(){
    document.getElementById('logout').style.visibility = 'hidden';
}
function hideLogin(){
    document.getElementById('login').style.visibility = 'hidden';
    document.getElementById('signUp').style.visibility = 'hidden';
}
{!IF((ISPICKVAL($User.UserType,'Guest')),'<script>hideLogout();</script>','<script>hideLogin();</script>')}