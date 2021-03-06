import LocalizableError from './LocalizableError';

export class InvalidMnemonicError extends LocalizableError {
  constructor() {
    super({
      id: 'global.errors.invalidMnemonic',
      defaultMessage: '!!!Invalid phrase entered, please check.',
    });
  }
}

export class LuxRedemptionCertificateParseError extends LocalizableError {
  constructor() {
    super({
      id: 'global.errors.LuxRedemptionCertificateParseError',
      defaultMessage: '!!!The LUX redemption code could not be parsed from the given document.',
    });
  }
}

export class LuxRedemptionEncryptedCertificateParseError extends LocalizableError {
  constructor() {
    super({
      id: 'global.errors.LuxRedemptionEncryptedCertificateParseError',
      defaultMessage: '!!!The LUX redemption code could not be parsed, please check your passphrase.',
    });
  }
}

export class InvalidEmailError extends LocalizableError {
  constructor() {
    super({
      id: 'global.errors.invalidEmail',
      defaultMessage: '!!!Invalid email entered, please check.',
    });
  }
}

export class FieldRequiredError extends LocalizableError {
  constructor() {
    super({
      id: 'global.errors.fieldIsRequired',
      defaultMessage: '!!!This field is required.',
    });
  }
}
