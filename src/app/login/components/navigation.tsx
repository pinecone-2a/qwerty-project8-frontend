import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';
export function Navigation(){
    return(
        <div>
            <div className="flex gap-3 ml-[80px] mt-[32px] text-[16px]">
        <Coffee />
            <div>Buy Me Coffee</div>
            </div>
        </div>
    )
}
// export function SignUp(){
//     return(
//         <div>
//            <Button>SignUp</Button>
//         </div>
//     )
// }
// export function Login(){
//     return(
//         <div>
//            <Button>Login</Button>
//         </div>
//     )
// }