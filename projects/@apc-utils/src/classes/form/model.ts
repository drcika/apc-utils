import { AbstractControlOptions, ValidatorFn } from '@angular/forms';
import { DynamicKey } from '../../models';

export type ApcFormType = DynamicKey<ApcControl> | Array<ApcControl> | string;

export type ApcValidators = ValidatorFn | ValidatorFn[] | AbstractControlOptions;

export type ConfigFN = () => ApcConfig;

export interface ApcConfig { value: ApcFormType; disabled?: boolean; validators?: ApcValidators; }

export type ApcControl = string | number | boolean | ConfigFN | ApcFormType;

