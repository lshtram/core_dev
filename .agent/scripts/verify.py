#!/usr/bin/env python3
import subprocess
import sys
import argparse
import os

def run_command(command, label):
    print(f"--- Running {label} ---")
    try:
        # Run with shell=True to handle npm commands easily
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {label} Passed")
            return True, ""
        else:
            print(f"❌ {label} Failed")
            # Extract the most relevant error lines to save tokens
            error_output = result.stdout + result.stderr
            lines = error_output.splitlines()
            # Heuristic: show last 20 lines of failure
            summary = "\n".join(lines[-20:])
            return False, summary
    except Exception as e:
        return False, f"Unexpected error running {label}: {str(e)}"

def main():
    parser = argparse.ArgumentParser(description="Efficiency-First Verification Wrapper")
    parser.add_argument("--lint", action="store_true", help="Run linting")
    parser.add_argument("--types", action="store_true", help="Run typechecking")
    parser.add_argument("--unit", action="store_true", help="Run unit tests")
    parser.add_argument("--e2e", action="store_true", help="Run E2E tests")
    
    args = parser.parse_args()
    
    if not any([args.lint, args.types, args.unit, args.e2e]):
        parser.print_help()
        return

    summary_report = []
    all_passed = True

    if args.lint:
        passed, error = run_command("npm run lint", "Linting")
        if not passed:
            all_passed = False
            summary_report.append(f"Linting Errors:\n{error}")

    if args.types:
        passed, error = run_command("npm run typecheck", "Typechecking")
        if not passed:
            all_passed = False
            summary_report.append(f"Typecheck Errors:\n{error}")

    if args.unit:
        passed, error = run_command("npm test -- --run", "Unit Testing")
        if not passed:
            all_passed = False
            summary_report.append(f"Unit Test Failures:\n{error}")

    if args.e2e:
        passed, error = run_command("npm run test:e2e", "E2E Testing")
        if not passed:
            all_passed = False
            summary_report.append(f"E2E Test Failures:\n{error}")

    if all_passed:
        print("\n🌟 ALL VERIFICATIONS PASSED 🌟")
    else:
        print("\n⚠️ VERIFICATION SUMMARY ⚠️")
        print("\n".join(summary_report))
        sys.exit(1)

if __name__ == "__main__":
    main()
