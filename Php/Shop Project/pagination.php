<nav aria-label="Page navigation example">
    <ul class="pagination mt-5">

        <li class="page-item 
        <?php
        if ($page_no <= 1) {
            echo 'disabled';
        }
        ?>"><a class="page-link" href="
        <?php
        if ($page_no <= 1) {
            echo '#';
        } else {
            echo "?page_no" . ($page_no - 1);
        }
        ?>">Prev</a></li>

        <li class="page-item">
            <a class="page-link" href="?page_no=1">1</a>
        </li>
        <li class="page-item"><a class="page-link" href="?page_no=2">2</a></li>

        <?php if ($page_no >= 3) { ?>
            <li class="page-item"><a class="page-link" href="#">...</a></li>
            <li class="page-item"><a class="page-link" href="
          <?php echo "?page_no=" . $page_no; ?>"><?php echo $page_no; ?></a></li>
        <?php } ?>

        <li class="page-item
        <?php if ($page_no >= $total_no_of_pages) {
            echo 'disabled';
        } ?>"><a class="page-link" href="
        <?php if ($page_no >= $total_no_of_pages) {
            echo '#';
        } else {
            echo "?page_no=" . ($page_no + 1);
        } ?>">Next</a></li>
    </ul>
</nav>