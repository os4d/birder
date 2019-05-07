import signal
import sys
from multiprocessing.pool import Pool
from time import sleep

from ..config import Config, Target, get_targets
from .tsdb import stats


class TermColor:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def monitor(target: Target):
    extra = ""
    try:
        color = TermColor.OKGREEN
        assert target.check()
        stats.success(target.ts_name)
    except KeyboardInterrupt:
        return
    except BaseException as e:
        raise
        color = TermColor.FAIL
        extra = str(e)
        stats.failure(target.ts_name)

    sys.stdout.write("%s%-15s %s %s %s\n" % (color, target.label, target.url,
                                          TermColor.ENDC, extra))
    sys.stdout.flush()


def init_worker():
    signal.signal(signal.SIGINT, signal.SIG_IGN)


def main():
    targets = get_targets()
    for target in targets:
        sys.stdout.write("%s%-15s %s %s\n" % (TermColor.WARNING, target.label, target.url, TermColor.ENDC))

    if targets:
        p = Pool(processes=20, initializer=init_worker)
        while True:
            try:
                p.map_async(monitor, targets).get(9999999)
                sleep(Config.POLLING_INTERVAL)
            except (KeyboardInterrupt, SystemExit):
                break
    else:
        sys.stderr.write('ERROR: No urls defined\n')
        sys.stderr.write('MONITOR<order>_<label>=<conn_url>\n')
        sys.exit(1)


if __name__ == '__main__':
    main()
