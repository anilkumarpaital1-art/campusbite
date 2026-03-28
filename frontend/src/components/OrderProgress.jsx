function OrderProgress({ status }) {

const steps = [
"Placed",
"Preparing",
"Delivered"
];

const currentStep = steps.indexOf(status);

return (

<div className="flex items-center gap-3 mt-3">

{steps.map((step,index)=>{

const active = index <= currentStep;

return(

<div key={step} className="flex items-center gap-2">

<div
className={`w-2.5 h-2.5 rounded-full ${
active ? "bg-red-600" : "bg-gray-300"
}`}
></div>

<p className="text-[10px] text-gray-500">
{step}
</p>

{index !== steps.length-1 && (
<div className="w-6 h-[1px] bg-gray-300"></div>
)}

</div>

)

})}

</div>

)

}

export default OrderProgress;