/* eslint-disable react/prop-types */
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, LoaderCircle, Lock, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export default function LoginForm({ flip }) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post('https://ecommerce-backend-deploying.vercel.app/api/signin', {
        email: data.email,
        password: data.password
      })
      window.localStorage.setItem("token", response.data.token)
      toast({
        title: "Sign in successful",
        description: "Welcome back!",
      })
      navigate("/dashboard")
      window.location.reload()
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error.response?.data?.message || "An error occurred during sign in",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Email address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="email@example.com"
                      {...field}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-1">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      {...field}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-xs mt-1">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              ) : (
                <ArrowRight className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={18} />
              )}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {['Google', 'Twitter', 'GitHub'].map((provider) => (
            <div key={provider}>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                {provider}
              </a>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-gray-600">
        Not a member?{' '}
        <span
          onClick={flip}
          className="font-medium  text-indigo-600 hover:text-indigo-500 cursor-pointer transition duration-200 ease-in-out"
        >
          Sign up now
        </span>
      </p>
    </div>
  
  )
}