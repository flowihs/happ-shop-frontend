"use client";

interface InputDefaultProps {
    placeholder: string;
    label: string;
}

export default function InputDefault(props: InputDefaultProps) {
  return (
      <div className="input">
          <label>
              {props.label}
          </label>

          <input placeholder={props.placeholder}/>
      </div>
  )
}
