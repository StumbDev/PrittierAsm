// dynamic.ts

import { ProgramNode, PrintStatementNode, IfStatementNode, ReturnStatementNode, BinaryExpressionNode, NodeType } from './ast';

export class DynamicHandler {
    public static execute(program: ProgramNode): void {
        for (const statement of program.body) {
            this.executeStatement(statement);
        }
    }

    private static executeStatement(statement: any): void {
        switch (statement.type) {
            case NodeType.PrintStatement:
                this.executePrint(statement);
                break;
            case NodeType.IfStatement:
                this.executeIf(statement);
                break;
            case NodeType.FunctionDeclaration:
                // Handle function declaration execution if necessary
                break;
            default:
                throw new Error(`Unknown statement type: ${statement.type}`);
        }
    }

    private static executePrint(statement: PrintStatementNode): void {
        const value = this.evaluateExpression(statement.argument);
        console.log(value);
    }

    private static executeIf(statement: IfStatementNode): void {
        const condition = this.evaluateExpression(statement.condition);
        if (condition) {
            for (const stmt of statement.thenBlock) {
                this.executeStatement(stmt);
            }
        }
    }

    private static evaluateExpression(expression: any): any {
        switch (expression.type) {
            case NodeType.BinaryExpression:
                return this.evaluateBinaryExpression(expression);
            case NodeType.Literal:
                return expression.value;
            case NodeType.Identifier:
                // Implement logic for identifiers
                return null; // Placeholder for variables
            default:
                throw new Error(`Unknown expression type: ${expression.type}`);
        }
    }

    private static evaluateBinaryExpression(expression: BinaryExpressionNode): any {
        const left = this.evaluateExpression(expression.left);
        const right = this.evaluateExpression(expression.right);
        switch (expression.operator) {
            case '+':
                return left + right;
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;
            case '==':
                return left === right;
            case '⇒':
                return left ? right : null;
            default:
                throw new Error(`Unknown operator: ${expression.operator}`);
        }
    }
}