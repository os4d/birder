from dns import resolver

from .base import BaseCheck, ConfigForm, forms


class DnsConfigForm(ConfigForm):
    """DNS checker configuration form."""

    help_text = """
    DNS check will be considered successful if *any* of the following conditions are met:
    - `Query Type` is set to `A` and the `Domain Name` resolves to the `Expected Value`
    - `Query Type` is set to `CNAME` and the `Domain Name` resolves to the `Expected Value`
    - `Query Type` is set to `MX` and the `Domain Name` resolves to the `Expected Value`
    - `Query Type` is set to `TXT` and the `Domain Name` resolves to the `Expected Value`
    """
    domain = forms.CharField(label="Domain Name")
    query_type = forms.ChoiceField(
        label="Query Type",
        choices=[
            ("A", "A"),
            ("AAAA", "AAAA"),
            ("CNAME", "CNAME"),
            ("MX", "MX"),
            ("TXT", "TXT"),
        ],
        initial="A",
    )
    expected_value = forms.CharField(label="Expected Value", required=False)
    nameserver = forms.CharField(
        label="Nameserver", required=False, help_text="Optional: IP address of the DNS server to use for the query."
    )


class DnsCheck(BaseCheck):
    """DNS checker."""

    icon = "world"
    config_class = DnsConfigForm
    pragma = ["dns"]

    def check(self, raise_error: bool = False) -> bool:
        """Perform the check."""
        domain = self.config["domain"]
        query_type = self.config["query_type"]
        expected_value = self.config["expected_value"]

        try:
            res = resolver.Resolver()
            if self.config["nameserver"]:
                res.nameservers = [self.config["nameserver"]]
            answers = res.resolve(domain, query_type)
            if not expected_value:
                return answers.rrset is not None

            for rdata in answers:
                if query_type == "MX":
                    value = str(rdata.exchange).rstrip(".")
                elif query_type == "TXT":
                    value = b"".join(rdata.strings).decode("utf-8")
                else:
                    value = rdata.to_text().rstrip(".")

                if value == expected_value:
                    return True
            return False
        except (resolver.NXDOMAIN, resolver.NoAnswer):
            return False
        except Exception:
            if raise_error:
                raise
            return False
