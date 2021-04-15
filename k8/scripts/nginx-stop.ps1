echo "stopping nginx...`n"

kubectl delete deployment -n ingress-nginx nginx-ingress-controller
echo "deleted nginx deployment`n"

kubectl delete svc -n ingress-nginx ingress-nginx
echo "deleted nginx service`n"