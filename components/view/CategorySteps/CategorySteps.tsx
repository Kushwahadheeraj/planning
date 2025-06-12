import React, { useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

const CategorySteps = () => {
  const [current, setCurrent] = useState(0);

  const steps: Step[] = [
    {
      title: 'Step 1',
      description: 'This is a description.',
    },
    {
      title: 'Step 2',
      description: 'This is a description.',
    },
    {
      title: 'Step 3',
      description: 'This is a description.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Horizontal Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2",
                index <= current
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/25"
              )}
            >
              {index + 1}
            </div>
            <div className="mt-2 text-center">
              <div className="font-medium">{step.title}</div>
              <div className="text-sm text-muted-foreground">{step.description}</div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute h-0.5 w-24 -translate-x-1/2",
                  index < current ? "bg-primary" : "bg-muted-foreground/25"
                )}
                style={{ left: `${(index + 1) * 33.33}%` }}
              />
            )}
          </div>
        ))}
      </div>

      <Separator />

      {/* Vertical Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2",
                index <= current
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/25"
              )}
            >
              {index + 1}
            </div>
            <div className="ml-4">
              <div className="font-medium">{step.title}</div>
              <div className="text-sm text-muted-foreground">{step.description}</div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute h-24 w-0.5 -translate-x-1/2",
                  index < current ? "bg-primary" : "bg-muted-foreground/25"
                )}
                style={{ left: "1rem", top: "2rem" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySteps;