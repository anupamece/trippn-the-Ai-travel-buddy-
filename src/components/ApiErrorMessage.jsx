import React from 'react'
import { AlertTriangle } from 'lucide-react'

const ApiErrorMessage = ({
  title = 'Unable to generate your trip plan',
  message = 'Something went wrong while contacting the trip planning service. Please try again.',
}) => {
  return (
    <div className="mb-6 rounded-[24px] border border-red-400/18 bg-red-500/10 px-5 py-4 text-left">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-red-300/20 bg-red-400/10">
          <AlertTriangle className="size-4 text-red-200" />
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-red-100/88">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-red-50/72">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default ApiErrorMessage
