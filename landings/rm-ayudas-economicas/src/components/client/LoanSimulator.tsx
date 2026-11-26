"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { formatARS, formatPercent, monthlyPayment, teaFromTna } from "@/lib/format";

type LoanSimulatorProps = {
  amount: { min: number; max: number; step: number; initial: number };
  terms: number[];
  initialTerm: number;
  tna: number;
  cft: string;
  disclaimer: string;
  cta: string;
  whatsapp: string;
};

export function LoanSimulator({
  amount: range,
  terms,
  initialTerm,
  tna,
  cft,
  disclaimer,
  cta,
  whatsapp,
}: LoanSimulatorProps) {
  const [amount, setAmount] = useState(range.initial);
  const [term, setTerm] = useState(initialTerm);
  const amountId = useId();
  const resultId = useId();
  const disclaimerId = useId();

  const payment = monthlyPayment(amount, tna, term);
  const message = `Hola RM, quiero solicitar una ayuda económica de ${formatARS(amount)} en ${term} cuotas.`;
  const whatsappHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="grid gap-8 rounded-card bg-white p-4 ring-1 ring-zinc-200 sm:p-8 lg:grid-cols-5 lg:gap-12">
      <form className="space-y-8 p-1 sm:p-0 lg:col-span-3" onSubmit={(event) => event.preventDefault()}>
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <label htmlFor={amountId} className="text-base font-medium text-zinc-900">
              ¿Cuánto necesitás?
            </label>
            <span className="text-2xl font-semibold tabular-nums text-zinc-900" aria-hidden="true">
              {formatARS(amount)}
            </span>
          </div>
          <input
            id={amountId}
            type="range"
            min={range.min}
            max={range.max}
            step={range.step}
            value={amount}
            aria-valuetext={formatARS(amount)}
            aria-describedby={disclaimerId}
            onChange={(event) => setAmount(Number(event.target.value))}
            className="mt-4 h-11 w-full cursor-pointer accent-brand-600"
          />
          <div className="flex justify-between text-sm text-zinc-600" aria-hidden="true">
            <span>{formatARS(range.min)}</span>
            <span>{formatARS(range.max)}</span>
          </div>
        </div>

        <fieldset>
          <legend className="text-base font-medium text-zinc-900">¿En cuántas cuotas?</legend>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {terms.map((option) => (
              <label
                key={option}
                className="flex min-h-11 cursor-pointer items-center justify-center rounded-full text-sm font-medium text-zinc-800 ring-1 ring-inset ring-zinc-300 transition-colors hover:bg-zinc-50 has-checked:bg-brand-600 has-checked:text-white has-checked:ring-brand-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600"
              >
                <input
                  type="radio"
                  name="term"
                  value={option}
                  checked={term === option}
                  onChange={() => setTerm(option)}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <div className="flex flex-col rounded-xl bg-brand-50 p-5 sm:p-6 lg:col-span-2">
        <p id={resultId} className="text-sm font-medium text-brand-700">
          Cuota mensual estimada
        </p>
        <output
          aria-labelledby={resultId}
          aria-live="polite"
          className="mt-1 block text-4xl font-semibold tabular-nums tracking-tight text-zinc-900"
        >
          {formatARS(payment)}
        </output>
        <p className="mt-1 text-sm text-zinc-600">
          {term} cuotas fijas · Total {formatARS(payment * term)}
        </p>

        <dl className="mt-6 space-y-2 border-t border-brand-100 pt-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="font-semibold text-zinc-900">CFT con IVA</dt>
            <dd className="text-base font-semibold text-zinc-900">{cft}</dd>
          </div>
          <div className="flex justify-between gap-4 text-zinc-700">
            <dt>TNA</dt>
            <dd className="tabular-nums">{formatPercent(tna)}</dd>
          </div>
          <div className="flex justify-between gap-4 text-zinc-700">
            <dt>TEA</dt>
            <dd className="tabular-nums">{formatPercent(teaFromTna(tna))}</dd>
          </div>
        </dl>

        <Button
          href={whatsappHref}
          size="lg"
          className="mt-6 w-full px-4 whitespace-nowrap"
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false}
        >
          <Icon name="chat" className="size-5" />
          {cta}
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </Button>
        <p id={disclaimerId} className="mt-4 text-xs leading-relaxed text-zinc-600">
          {disclaimer}
        </p>
      </div>
    </div>
  );
}
