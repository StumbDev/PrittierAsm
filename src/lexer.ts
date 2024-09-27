// lexer.ts

export enum TokenType {
    Identifier,
    Keyword,
    Number,
    String,
    Operator,
    Parenthesis,
    Whitespace,
    EOF,
}

export interface Token {
    type: TokenType;
    value: string;
}

export class Lexer {
    private position: number = 0;
    private currentChar: string | null;
    private input: string;

    constructor(input: string) {
        this.input = input;
        this.currentChar = this.input[this.position];
    }

    private advance(): void {
        this.position++;
        this.currentChar = this.position < this.input.length ? this.input[this.position] : null;
    }

    private skipWhitespace(): void {
        while (this.currentChar !== null && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    public getNextToken(): Token {
        while (this.currentChar !== null) {
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (/[a-zA-Z_]/.test(this.currentChar)) {
                const start = this.position;
                while (this.currentChar !== null && /[a-zA-Z0-9_]/.test(this.currentChar)) {
                    this.advance();
                }
                const value = this.input.slice(start, this.position);
                return { type: TokenType.Identifier, value };
            }

            if (/\d/.test(this.currentChar)) {
                const start = this.position;
                while (this.currentChar !== null && /\d/.test(this.currentChar)) {
                    this.advance();
                }
                const value = this.input.slice(start, this.position);
                return { type: TokenType.Number, value };
            }

            if (this.currentChar === '"') {
                this.advance(); // Skip the opening quote
                const start = this.position;
                while (this.currentChar !== null && this.currentChar !== '"') {
                    this.advance();
                }
                const value = this.input.slice(start, this.position);
                this.advance(); // Skip the closing quote
                return { type: TokenType.String, value };
            }

            if (this.currentChar === '(' || this.currentChar === ')') {
                const value = this.currentChar;
                this.advance();
                return { type: TokenType.Parenthesis, value };
            }

            if (['+', '-', '*', '/', '=', '⇒'].includes(this.currentChar)) {
                const value = this.currentChar;
                this.advance();
                return { type: TokenType.Operator, value };
            }

            throw new Error(`Unexpected character: ${this.currentChar}`);
        }

        return { type: TokenType.EOF, value: '' };
    }
}
