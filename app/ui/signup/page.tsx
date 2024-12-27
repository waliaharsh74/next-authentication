'use client'

import { signup } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import { useActionState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

// export default function SignupForm() {
//   const [state, action, pending] = useActionState(signup, undefined)
//   return (
//     <form action={action}>
//       <div>
//         <label htmlFor="name">Name</label>
//         <input id="name" name="name" placeholder="Name" />
//       </div>
//       {state?.errors?.name && <p>{state.errors.name}</p>}

//       <div>
//         <label htmlFor="email">Email</label>
//         <input id="email" name="email" placeholder="Email" />
//       </div>
//       {state?.errors?.email && <p>{state.errors.email}</p>}

//       <div>
//         <label htmlFor="password">Password</label>
//         <input id="password" name="password" type="password" />
//       </div>
//       {state?.errors?.password && (
//         <div>
//           <p>Password must:</p>
//           <ul>
//             {state.errors.password.map((error) => (
//               <li key={error}>- {error}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <button className="bg-blue-100 text-black p-3" disabled={pending} type="submit">
//         Sign Up
//       </button>
//       {state?.message && <p>{state.message}</p>}
//       {state?.status == "success" && <button className="bg-blue-100 text-black p-3" onClick={() => redirect('/api/auth/signin?csrf=true')}>
//         Sign In
//       </button>}
//       <ToastContainer />
//     </form>
//   )
// }



import React from "react";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { cn } from "../../lib/utils";
"@tabler/icons-react";

export default function SignupFormDemo() {
  const [state, action, pending] = useActionState(signup, undefined)


  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Sign up form
      </h2>


      <form className="my-8" action={action}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Name</Label>
            <Input id="name" name="name" placeholder="Name" type="text" />
            {state?.errors?.name && <p>{state.errors.name}</p>}
          </LabelInputContainer>

        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" name="email" type="email" />
          {state?.errors?.email && <p>{state.errors.email}</p>}

        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" name="password" type="password" />
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={pending}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        {state?.status == "success" && <button className="bg-blue-100 text-black p-3" onClick={() => redirect('/api/auth/signin?csrf=true')}>
          Clic here to go  To Sign In
        </button>}


      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
