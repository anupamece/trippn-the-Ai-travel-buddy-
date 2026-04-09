import { LoaderCircle, MapPinned, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const baseInputClassName =
  'mt-3 h-14 w-full rounded-2xl border border-white/10 bg-white/6 px-4 pr-12 text-base text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-white/8 focus:ring-4 focus:ring-cyan-300/10'

const GeoapifyAutocomplete = ({
  value,
  onChange,
  onSelect,
  placeholder = 'Search city, country, or dream getaway',
  className = '',
}) => {
  const [query, setQuery] = useState(value ?? '')
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')
  const abortRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    setQuery(value ?? '')
  }, [value])

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setSuggestions([])
      setIsLoading(false)
      setError('')
      return undefined
    }

    if (!apiKey) {
      setSuggestions([])
      setError('Add VITE_GEOAPIFY_API_KEY to your .env file to enable destination suggestions.')
      return undefined
    }

    const timeoutId = window.setTimeout(async () => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      setIsLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({
          text: trimmedQuery,
          apiKey,
          type: 'city',
          limit: '5',
          format: 'json',
        })

        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?${params.toString()}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Unable to fetch destination suggestions right now.')
        }

        const data = await response.json()
        setSuggestions(data.results ?? [])
        setIsOpen(true)
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return
        }

        setSuggestions([])
        setError('Unable to load suggestions. Please keep typing or try again.')
      } finally {
        setIsLoading(false)
      }
    }, 250)

    return () => {
      window.clearTimeout(timeoutId)
      abortRef.current?.abort()
    }
  }, [query])

  function handleInputChange(event) {
    const nextValue = event.target.value
    setQuery(nextValue)
    onChange?.(nextValue)
    setIsOpen(true)
  }

  function handleSelect(item) {
    const label = item.formatted || item.city || item.address_line1 || query
    setQuery(label)
    setSuggestions([])
    setIsOpen(false)
    onChange?.(label)
    onSelect?.(item)
  }

  function handleClear() {
    setQuery('')
    setSuggestions([])
    setIsOpen(false)
    setError('')
    onChange?.('')
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true)
            }
          }}
          placeholder={placeholder}
          className={`${baseInputClassName} ${className}`.trim()}
          autoComplete="off"
        />

        {query && !isLoading ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-3 flex items-center rounded-full px-1 text-white/45 transition-colors hover:text-white/80"
            aria-label="Clear destination"
          >
            <X className="size-4" />
          </button>
        ) : (
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            {isLoading ? (
              <LoaderCircle className="size-4 animate-spin text-cyan-300" />
            ) : (
              <Search className="size-4 text-white/40" />
            )}
          </div>
        )}
      </div>

      {error ? <p className="mt-2 text-sm text-amber-200/85">{error}</p> : null}

      {isOpen && suggestions.length > 0 ? (
        <div className="absolute z-20 mt-3 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-[0_20px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          {suggestions.map((item) => {
            const key = item.place_id ?? `${item.lat}-${item.lon}-${item.formatted}`
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelect(item)}
                className="flex w-full items-start gap-3 border-b border-white/6 px-4 py-3 text-left text-white transition-colors last:border-b-0 hover:bg-white/6"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200">
                  <MapPinned className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-white">
                    {item.city || item.address_line1 || item.formatted}
                  </span>
                  <span className="block truncate text-xs text-white/55">{item.formatted}</span>
                </span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default GeoapifyAutocomplete
