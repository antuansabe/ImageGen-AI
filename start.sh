#!/bin/bash
# Script de inicio para Render
# Este script se ejecuta desde la raíz del proyecto

cd backend
gunicorn app:app --bind 0.0.0.0:$PORT
