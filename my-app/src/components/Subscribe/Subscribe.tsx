import { useState, type ChangeEvent } from 'react';
import * as z from "zod";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const subscribeSchema = z.object({ 
  email: z.string().trim().pipe(z.email({error: "Please enter a valid email address"})),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

export default function Subscribe() {
   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: "",}
  });

  const onSubmit: SubmitHandler<SubscribeFormValues> = async (data) => {
    console.log(data);
    reset();
  }

  return (
    <div className="bg-primary/30 py-5 mt-25">
      <div className="subscription__heading container m-auto mt-20">
        <h2 className="text-center text-3xl capitalize">Subscription now to get <span className="font-bold text-red-600">UP</span> to <span className="font-bold text-red-600">20% DISCOUNT</span></h2>
      </div>
      <div className="container m-auto mt-10 mb-20 flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col justify-center items-center relative">
          <div className="subscription__form flex max-w-120 w-full justify-center items-center relative">
              <input
                {...register("email")}
                id="subscription-email"
                type="email" 
                name="email"
                autoComplete="email"
                placeholder="Email..."
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "subscription-email-error" : undefined
                } 
                className="
                  max-w-120 w-full h-10 
                  border border-gray-300 rounded-lg
                  pl-2
                "
              />
              <button
              type="submit"
              disabled={isSubmitting}
              aria-label="submit-button"
              className="
                absolute top-[-0.5px] right-[-0.1px]
                h-10
                p-5
                py-5.3
                flex justify-center items-center
                border border-gray-300 rounded-lg
                bg-gray-900 text-white
                cursor-pointer
                uppercase
              "
              >{isSubmitting ? "Submitting..." : "Submit"}</button>
            
          </div>
          {errors.email && (
            <p
              id="subscription-email-error"
              role="alert"
              className="w-full max-w-120 text-sm text-red-600 absolute top-full"
            >
              {errors.email.message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
