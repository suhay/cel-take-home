import React from 'react'
import { type FormEvent } from 'react'
import { toast } from 'react-toastify'

export function NewEvent({ refetch }: { refetch: () => void }) {
  const success = (msg: string) => toast(msg, { type: 'success' })
  const fail = (msg: string) => toast(msg, { type: 'error' })

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      const name = formData.get('name') as string
      const startTime = formData.get('startTime') as string
      const duration = formData.get('duration') as string

      const su = formData.get('Su') as string
      const mo = formData.get('Mo') as string
      const tu = formData.get('Tu') as string
      const we = formData.get('We') as string
      const th = formData.get('Th') as string
      const fr = formData.get('Fr') as string
      const sa = formData.get('Sa') as string

      const daysOfWeek = [su, mo, tu, we, th, fr, sa].filter((day) => day).join(',')

      if (daysOfWeek === '') {
        fail('Please select at least one day of the week')
        return
      }

      const body = JSON.stringify({ name, startTime, duration, daysOfWeek })

      const res = await fetch('/api/addEvent', {
        body,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = (await res.json()) as
        | { data: string; error: never }
        | { error: string; data: never }

      console.log(data)

      if (data.data != null) {
        success(data.data)
      } else {
        fail(data.error)
      }
    } catch (error) {
    } finally {
      refetch()
    }
  }

  return (
    <div className='mt-8 mx-auto w-full max-w-xl text-left flex flex-col gap-4'>
      <form
        onSubmit={submit}
        className='flex flex-col items-center gap-2 bg-[#1a1a1a] p-3 rounded-xl font-mono border-2 border-[#fbf0df] transition-colors duration-300 focus-within:border-[#f3d5a3] w-full'
      >
        <div>
          <label htmlFor='name'>Event name</label>
          <input
            type='text'
            name='name'
            id='name'
            className='w-full flex-1 bg-transparent border-1 text-[#fbf0df] font-mono text-base py-1.5 px-2 focus:text-white placeholder-[#fbf0df]/40'
            placeholder=''
            required
          />
        </div>
        <div>
          <label htmlFor='startTime'>Start time</label>
          <input
            type='time'
            name='startTime'
            className='w-full flex-1 bg-transparent border-1 text-[#fbf0df] font-mono text-base py-1.5 px-2 outline-none focus:text-white placeholder-[#fbf0df]/40'
            placeholder='Start time'
            defaultValue='12:00:00'
            step={1}
            required
          />
        </div>
        <div>
          <label htmlFor='duration'>Duration (minutes)</label>
          <input
            type='number'
            name='duration'
            max={1440}
            min={1}
            required
            className='w-full flex-1 bg-transparent border-1 text-[#fbf0df] font-mono text-base py-1.5 px-2 outline-none focus:text-white placeholder-[#fbf0df]/40'
          />
        </div>
        <div>
          <label htmlFor='daysOfWeek'>Days of the week</label>
        </div>
        <div className='flex flex-row flex-wrap gap-2 justify-center'>
          <div>
            <input type='checkbox' id='Su' name='Su' value='Su' />
            <label htmlFor='Su'> Sunday</label>
          </div>
          <div>
            <input type='checkbox' id='Mo' name='Mo' value='Mo' />
            <label htmlFor='Mo'> Monday</label>
          </div>
          <div>
            <input type='checkbox' id='Tu' name='Tu' value='Tu' />
            <label htmlFor='Tu'> Tuesday</label>
          </div>
          <div>
            <input type='checkbox' id='We' name='We' value='We' />
            <label htmlFor='We'> Wednesday</label>
          </div>
          <div>
            <input type='checkbox' id='Th' name='Th' value='Th' />
            <label htmlFor='Th'> Thursday</label>
          </div>
          <div>
            <input type='checkbox' id='Fr' name='Fr' value='Fr' />
            <label htmlFor='Fr'> Friday</label>
          </div>
          <div>
            <input type='checkbox' id='Sa' name='Sa' value='Sa' />
            <label htmlFor='Sa'> Saturday</label>
          </div>
        </div>

        <button
          type='submit'
          className='bg-[#fbf0df] text-[#1a1a1a] border-0 px-5 py-1.5 rounded-lg font-bold transition-all duration-100 hover:bg-[#f3d5a3] hover:-translate-y-px cursor-pointer whitespace-nowrap'
        >
          Add
        </button>
      </form>
    </div>
  )
}
