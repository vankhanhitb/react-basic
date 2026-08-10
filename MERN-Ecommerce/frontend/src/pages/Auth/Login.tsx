import { useState, useEffect } from 'react';
import {
  Link,
  useLocation,
  useNavigation
} from "react-router-dom";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import Loader from "../../components/Loader";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      console.log(res);
      dispatch(setCredientials({...res}));
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  return (
    <section className="pl- flex flex-wrap">
      <div className="ml-10 mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-white">Sign In</h2>
        <form
          onSubmit={submitHandler} 
          action=""
          className="container w-160"
        >
          <div className="my-8">
            <label 
              htmlFor="email"
              className="block text-sm font-800 text-white"
            >
              Email Adress
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Email..."
              className="mt-1 border border-white py-1.5 pl-2 text-white rounded-sm w-full" 
            />
          </div>
          <div className="my-8">
            <label 
              htmlFor="email"
              className="block text-sm font-800 text-white"
            >
              Password
            </label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="*****"
              className="mt-1 border border-white py-1.5 pl-2 text-white rounded-sm w-full" 
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-1"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="mt-2">
          <p className="text-white text-sm flex gap-2">
            <span>New Customer ? </span>
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-pink-800 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
