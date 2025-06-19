import { ChevronDown, ChevronUp } from 'lucide-react';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';
import { Button } from './ui/button';
import { Input } from './ui/input';

export interface NumberInputProps
    extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
    stepper?: number;
    thousandSeparator?: string;
    placeholder?: string;
    defaultValue?: number;
    min?: number;
    max?: number;
    value?: number; // Controlled value
    suffix?: string;
    prefix?: string;
    onValueChange?: (value: number | undefined) => void;
    fixedDecimalScale?: boolean;
    decimalScale?: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            stepper,
            thousandSeparator,
            placeholder,
            defaultValue,
            min = -Infinity,
            max = Infinity,
            onValueChange,
            fixedDecimalScale = false,
            decimalScale = 0,
            suffix,
            prefix,
            value: controlledValue,
            ...props
        },
        ref
    ) => {
        // Only use internal state if value is undefined (uncontrolled usage)
        const [uncontrolledValue, setUncontrolledValue] = useState<number | undefined>(
            defaultValue
        );
        const isControlled = controlledValue !== undefined;
        const value = isControlled ? controlledValue : uncontrolledValue;

        const handleIncrement = useCallback(() => {
            const newValue = value === undefined ? stepper ?? 1 : Math.min(value + (stepper ?? 1), max);
            if (isControlled) {
                onValueChange?.(newValue);
            } else {
                setUncontrolledValue(newValue);
                onValueChange?.(newValue);
            }
        }, [value, stepper, max, isControlled, onValueChange]);

        const handleDecrement = useCallback(() => {
            const newValue = value === undefined ? -(stepper ?? 1) : Math.max(value - (stepper ?? 1), min);
            if (isControlled) {
                onValueChange?.(newValue);
            } else {
                setUncontrolledValue(newValue);
                onValueChange?.(newValue);
            }
        }, [value, stepper, min, isControlled, onValueChange]);

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (
                    document.activeElement ===
                    (ref as React.RefObject<HTMLInputElement>).current
                ) {
                    if (e.key === 'ArrowUp') {
                        handleIncrement();
                    } else if (e.key === 'ArrowDown') {
                        handleDecrement();
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, [handleIncrement, handleDecrement, ref]);

        const handleChange = (values: {
            value: string;
            floatValue: number | undefined;
        }) => {
            const newValue =
                values.floatValue === undefined ? undefined : values.floatValue;
            if (isControlled) {
                onValueChange?.(newValue);
            } else {
                setUncontrolledValue(newValue);
                onValueChange?.(newValue);
            }
        };

        const handleBlur = () => {
            if (value !== undefined) {
                let newValue = value;
                if (value < min) {
                    newValue = min;
                } else if (value > max) {
                    newValue = max;
                }
                if (newValue !== value) {
                    if (isControlled) {
                        onValueChange?.(newValue);
                    } else {
                        setUncontrolledValue(newValue);
                        onValueChange?.(newValue);
                    }
                    (ref as React.RefObject<HTMLInputElement>).current!.value = String(newValue);
                }
            }
        };

        return (
            <div className="flex items-center">
                <NumericFormat
                    value={value}
                    onValueChange={handleChange}
                    thousandSeparator={thousandSeparator}
                    decimalScale={decimalScale}
                    fixedDecimalScale={fixedDecimalScale}
                    allowNegative={min < 0}
                    valueIsNumericString
                    onBlur={handleBlur}
                    max={max}
                    min={min}
                    suffix={suffix}
                    prefix={prefix}
                    customInput={Input}
                    placeholder={placeholder}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-r-none relative"
                    getInputRef={ref}
                    {...props}
                />

                <div className="flex flex-col">
                    <Button
                        aria-label="Increase value"
                        className="px-2 h-5 rounded-l-none rounded-br-none border-input border-l-0 border-b-[0.5px] focus-visible:relative"
                        variant="outline"
                        onClick={handleIncrement}
                        disabled={value === max}
                    >
                        <ChevronUp size={15} />
                    </Button>
                    <Button
                        aria-label="Decrease value"
                        className="px-2 h-5 rounded-l-none rounded-tr-none border-input border-l-0 border-t-[0.5px] focus-visible:relative"
                        variant="outline"
                        onClick={handleDecrement}
                        disabled={value === min}
                    >
                        <ChevronDown size={15} />
                    </Button>
                </div>
            </div>
        );
    }
);
