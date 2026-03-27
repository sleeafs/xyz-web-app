#!/bin/bash
# Rebuild following the PDF structure exactly

# Clean slate
cd src/app
rm -rf features core shared models
mkdir -p core/services models shared features/dashboard

echo "Creating structure..."
