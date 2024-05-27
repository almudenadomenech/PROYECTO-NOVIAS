import { HttpInterceptorFn } from '@angular/common/http';



export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem("jwt_token");
  if(token){
    req = req.clone({
      headers: req.headers.set('Authorization',  `Bearer ${token}`)
     
    });
  }
  return next(req);
};

