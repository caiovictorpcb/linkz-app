"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export function PercentageCalculator() {
  const [value1, setValue1] = useState<string>("300")
  const [percent1, setPercent1] = useState<string>("100")
  const [value2, setValue2] = useState<string>("0")
  const [percent2, setPercent2] = useState<string>("")

  useEffect(() => {
    calculatePercentage()
  }, [value1, percent1, value2])

  const calculatePercentage = () => {
    if (value1 && percent1 && value2) {
      const val1 = Number.parseFloat(value1)
      const perc1 = Number.parseFloat(percent1)
      const val2 = Number.parseFloat(value2)

      if (!isNaN(val1) && !isNaN(perc1) && !isNaN(val2) && val1 !== 0) {
        const result = (val2 * perc1) / val1
        setPercent2(result.toFixed(2))
      } else {
        setPercent2("")
      }
    } else {
      setPercent2("")
    }
  }

  const resetForm = () => {
    setValue1("300")
    setPercent1("100")
    setValue2("0")
    setPercent2("")
    setTimeout(calculatePercentage, 0)
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="value1" className="text-sm font-medium">
              Value
            </label>
            <Input
              id="value1"
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="Enter value"
              className="border-primary/30 focus-visible:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="percent1" className="text-sm font-medium">
              Percentage
            </label>
            <div className="relative">
              <Input
                id="percent1"
                type="number"
                value={percent1}
                onChange={(e) => setPercent1(e.target.value)}
                placeholder="Enter percentage"
                className="border-primary/30 focus-visible:ring-primary/50"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">%</div>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="value2" className="text-sm font-medium">
              Value
            </label>
            <Input
              id="value2"
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="Enter value"
              className="border-primary/30 focus-visible:ring-primary/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="percent2" className="text-sm font-medium">
              Percentage
            </label>
            <div className="relative">
              <Input
                id="percent2"
                type="number"
                value={percent2}
                readOnly
                className="bg-muted/50 border-primary/30 focus-visible:ring-primary/50"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">%</div>
            </div>
          </div>
        </div>
        
      </CardContent>
    </Card>
  ) 
}
